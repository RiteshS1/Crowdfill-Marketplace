"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import "./Transaction.css"

const Transaction = ({ account, signer, crowdfillContract, tokenContract, tokenAddress, refreshData }) => {
  const [activeTab, setActiveTab] = useState("create")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [isApproved, setIsApproved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (account && tokenContract && crowdfillContract && amount) {
      checkAllowance()
    }
  }, [amount, account, tokenContract, crowdfillContract])

  const checkAllowance = async () => {
    try {
      const allowance = await tokenContract.allowance(account, crowdfillContract.target)
      const amountInWei = ethers.parseUnits(amount || "0", 18)
      setIsApproved(allowance >= amountInWei && amountInWei > 0)
    } catch (error) {
      console.error("Error checking allowance:", error)
    }
  }

  const handleApprove = async () => {
    if (!signer || !tokenContract) {
      alert("Please connect wallet!")
      return
    }
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    try {
      setIsLoading(true)
      const amountInWei = ethers.parseUnits(amount, 18)
      const tx = await tokenContract.approve(crowdfillContract.target, amountInWei)

      addTransaction("Approve", `Approving ${amount} TEST tokens`, tx.hash)

      await tx.wait()
      setIsApproved(true)

      updateTransaction(tx.hash, "Approved", `Approved ${amount} TEST tokens`)
    } catch (error) {
      console.error("Error approving tokens:", error)
      alert("Error approving tokens: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateOrder = async () => {
    if (!signer || !crowdfillContract) {
      alert("Please connect wallet!")
      return
    }
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }
    if (!price || Number.parseFloat(price) <= 0) {
      alert("Please enter a valid price")
      return
    }

    try {
      setIsLoading(true)
      const amountInWei = ethers.parseUnits(amount, 18)
      const priceInWei = ethers.parseUnits(price, 18)

      // Check allowance
      const allowance = await tokenContract.allowance(account, crowdfillContract.target)
      if (allowance < amountInWei) {
        alert("Please approve tokens first")
        setIsApproved(false)
        setIsLoading(false)
        return
      }

      const tx = await crowdfillContract.createOrder(tokenAddress, amountInWei, priceInWei)

      addTransaction("Create Order", `Creating order for ${amount} TEST at ${price} ETH each`, tx.hash)

      await tx.wait()

      updateTransaction(tx.hash, "Order Created", `Created order for ${amount} TEST at ${price} ETH each`)

      // Reset form
      setAmount("")
      setPrice("")
      setIsApproved(false)

      // Refresh orders
      refreshData()
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Error creating order: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const addTransaction = (type, description, hash) => {
    const newTx = {
      id: Date.now(),
      type,
      description,
      hash,
      status: "Pending",
      timestamp: new Date().toLocaleString(),
    }

    setTransactions((prev) => [newTx, ...prev].slice(0, 5))
  }

  const updateTransaction = (hash, status, description) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.hash === hash ? { ...tx, status, description, timestamp: new Date().toLocaleString() } : tx
      )
    )
  }

  return (
    <section className="transaction-section">
      <div className="tabs">
        <button className={`tab ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}>
          Create Order
        </button>
        <button className={`tab ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>
          Transaction History
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "create" && (
          <div className="create-order">
            <h3>Create New Order</h3>
            <div className="form-group">
              <label>Amount of TEST Tokens to Sell</label>
              <input
                type="number"
                placeholder="Enter amount of tokens"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setIsApproved(false)
                }}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Price per Token (ETH)</label>
              <input
                type="number"
                placeholder="Enter price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-actions">
              {!isApproved ? (
                <button
                  className="approve-btn"
                  onClick={handleApprove}
                  disabled={isLoading || !amount || Number.parseFloat(amount) <= 0 || !signer}
                >
                  {isLoading ? "Approving..." : "Approve Tokens"}
                </button>
              ) : (
                <button
                  className="create-btn"
                  onClick={handleCreateOrder}
                  disabled={isLoading || !price || Number.parseFloat(price) <= 0 || !signer}
                >
                  {isLoading ? "Creating..." : "Create Order"}
                </button>
              )}
            </div>

            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="summary-row">
                <span>Token:</span>
                <span>TEST</span>
              </div>
              <div className="summary-row">
                <span>Amount:</span>
                <span>{amount || "0"} TEST</span>
              </div>
              <div className="summary-row">
                <span>Price per token:</span>
                <span>{price || "0"} ETH</span>
              </div>
              <div className="summary-row">
                <span>Total value:</span>
                <span>{(Number.parseFloat(amount || "0") * Number.parseFloat(price || "0")).toFixed(6)} ETH</span>
              </div>
              <div className="summary-row">
                <span>Platform fee (0.5%):</span>
                <span>
                  {(Number.parseFloat(amount || "0") * Number.parseFloat(price || "0") * 0.005).toFixed(6)} ETH
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="transaction-history">
            <h3>Recent Transactions</h3>
            {transactions.length > 0 ? (
              <div className="transactions-list">
                {transactions.map((tx) => (
                  <div className="transaction-item" key={tx.id}>
                    <div className="tx-header">
                      <h4>{tx.type}</h4>
                      <span className={`status ${tx.status === "Pending" ? "pending" : "success"}`}>{tx.status}</span>
                    </div>
                    <p className="tx-description">{tx.description}</p>
                    <div className="tx-details">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tx-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        View on Etherscan
                      </a>
                      <span className="tx-time">{tx.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-transactions">
                <p>No recent transactions</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Transaction