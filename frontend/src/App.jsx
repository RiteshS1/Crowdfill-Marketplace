"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Transaction from "./components/Transaction"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HowItWorks from "./components/HowItWorks"
import "./App.css"
import CrowdfillABI from "./abis/CrowdfillABI"
import TokenABI from "./abis/TokenABI"

// Contract addresses
const CROWDFILL_ADDRESS = "0x2ba518E51de7643dA241b0C486A39fDBA7080226"
const TEST_TOKEN_ADDRESS = "0xAdaCD49E2193B68177B75f762aB991E1da373f4B"

function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState("")
  const [crowdfillContract, setCrowdfillContract] = useState(null)
  const [tokenContract, setTokenContract] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [tokenBalance, setTokenBalance] = useState("0")
  const [ethBalance, setEthBalance] = useState("0")

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Set up provider (ethers v6)
          const provider = new ethers.BrowserProvider(window.ethereum)
          setProvider(provider)

          // Check if already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            const signer = await provider.getSigner()
            setSigner(signer)
            setAccount(accounts[0])

            // Set up contracts with signer
            const crowdfill = new ethers.Contract(CROWDFILL_ADDRESS, CrowdfillABI, signer)
            setCrowdfillContract(crowdfill)

            const token = new ethers.Contract(TEST_TOKEN_ADDRESS, TokenABI, signer)
            setTokenContract(token)

            // Get balances
            await updateBalances(accounts[0], provider, token)

            // Load orders
            await loadOrders(crowdfill)
          }
        } catch (error) {
          console.error("Initialization error:", error)
        } finally {
          setLoading(false)
        }
      } else {
        console.log("Please install MetaMask!")
        setLoading(false)
      }
    }

    init()

    // Listen for account/chain changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          window.location.reload()
        } else {
          setAccount("")
          setSigner(null)
          setCrowdfillContract(null)
          setTokenContract(null)
        }
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("chainChanged")
      }
    }
  }, [])

  const updateBalances = async (address, provider, tokenContract) => {
    try {
      const ethBal = await provider.getBalance(address)
      setEthBalance(ethers.formatEther(ethBal))

      if (tokenContract) {
        const tokenBal = await tokenContract.balanceOf(address)
        setTokenBalance(ethers.formatUnits(tokenBal, 18))
      }
    } catch (error) {
      console.error("Error updating balances:", error)
    }
  }

  const loadOrders = async (contract) => {
    try {
      if (!contract) return
      setLoading(true)
      const orderCount = await contract.orderCount()
      const orderList = []

      for (let i = 0; i < orderCount; i++) {
        const orderData = await contract.getOrder(i)
        const [seller, token, amount, price, filled, isActive, createdAt, updatedAt] = orderData

        if (isActive) {
          orderList.push({
            id: i,
            seller,
            token,
            amount: ethers.formatUnits(amount, 18),
            price: ethers.formatEther(price),
            filled: ethers.formatUnits(filled, 18),
            isActive,
            createdAt: new Date(Number(createdAt) * 1000).toLocaleString(),
            updatedAt: new Date(Number(updatedAt) * 1000).toLocaleString(),
          })
        }
      }

      setOrders(orderList)
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const signer = await provider.getSigner()

        setProvider(provider)
        setSigner(signer)
        setAccount(accounts[0])

        // Set up contracts with signer
        const crowdfill = new ethers.Contract(CROWDFILL_ADDRESS, CrowdfillABI, signer)
        setCrowdfillContract(crowdfill)

        const token = new ethers.Contract(TEST_TOKEN_ADDRESS, TokenABI, signer)
        setTokenContract(token)

        // Update balances
        await updateBalances(accounts[0], provider, token)

        // Reload orders
        await loadOrders(crowdfill)
      } catch (error) {
        console.error("Error connecting wallet:", error)
        alert("Error connecting wallet: " + error.message)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const refreshData = async () => {
    if (crowdfillContract && account) {
      await loadOrders(crowdfillContract)
      await updateBalances(account, provider, tokenContract)
    }
  }

  return (
    <div className="app">
      <Navbar account={account} connectWallet={connectWallet} tokenBalance={tokenBalance} ethBalance={ethBalance} />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Decentralized OTC Trading</h1>
            <h2 className="hero-subtitle">Trade ERC20 Tokens Directly</h2>
            <p>Create and fill orders with partial fills in a secure, transparent marketplace</p>
            {!account && (
              <button className="cta-btn" onClick={connectWallet}>
                Start Trading
              </button>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">0.5%</span>
              <span className="stat-label">Platform Fee</span>
            </div>
            <div className="stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">On-Chain</span>
            </div>
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Trading</span>
            </div>
          </div>
          <div className="hero-graphic">
            <div className="graphic-element"></div>
            <div className="graphic-element"></div>
            <div className="graphic-element"></div>
          </div>
        </section>

        <HowItWorks />

        {account && (
          <>
            <section className="transaction-wrapper" id="create-order">
              <Transaction
                account={account}
                signer={signer}
                crowdfillContract={crowdfillContract}
                tokenContract={tokenContract}
                tokenAddress={TEST_TOKEN_ADDRESS}
                refreshData={refreshData}
              />
            </section>

            <section className="marketplace" id="marketplace">
              <div className="section-header">
                <h2>Active Orders</h2>
                <p>Browse and fill available orders in the marketplace</p>
                <button className="refresh-btn" onClick={refreshData} disabled={loading}>
                  {loading ? "Loading..." : "Refresh Orders"}
                </button>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="loading-spinner"></div>
                  <p>Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="orders-grid">
                  {orders.map((order) => (
                    <div className="order-card" key={order.id}>
                      <div className="order-header">
                        <h3>Order #{order.id}</h3>
                        <span
                          className={order.seller.toLowerCase() === account.toLowerCase() ? "tag-own" : "tag-other"}
                        >
                          {order.seller.toLowerCase() === account.toLowerCase() ? "Your Order" : "Market Order"}
                        </span>
                      </div>
                      <div className="order-details">
                        <div className="detail-row">
                          <span>Amount:</span>
                          <span>{Number.parseFloat(order.amount).toFixed(6)} TEST</span>
                        </div>
                        <div className="detail-row">
                          <span>Price:</span>
                          <span>{Number.parseFloat(order.price).toFixed(6)} ETH</span>
                        </div>
                        <div className="detail-row">
                          <span>Filled:</span>
                          <span>
                            {Number.parseFloat(order.filled).toFixed(6)} TEST (
                            {((Number.parseFloat(order.filled) / Number.parseFloat(order.amount)) * 100).toFixed(2)}%)
                          </span>
                        </div>
                        <div className="detail-row">
                          <span>Total Value:</span>
                          <span>
                            {(Number.parseFloat(order.amount) * Number.parseFloat(order.price)).toFixed(6)} ETH
                          </span>
                        </div>
                        <div className="detail-row">
                          <span>Created:</span>
                          <span>{order.createdAt}</span>
                        </div>
                      </div>

                      <div className="order-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${(Number.parseFloat(order.filled) / Number.parseFloat(order.amount)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="progress-text">
                          {((Number.parseFloat(order.filled) / Number.parseFloat(order.amount)) * 100).toFixed(2)}%
                          filled
                        </div>
                      </div>

                      {order.seller.toLowerCase() !== account.toLowerCase() && (
                        <div className="order-actions">
                          <button
                            className="fill-btn"
                            onClick={async () => {
                              try {
                                const amountToFill = prompt("Enter amount to fill (in TEST tokens):", "0")
                                if (amountToFill && Number.parseFloat(amountToFill) > 0) {
                                  const amountInWei = ethers.parseUnits(amountToFill, 18)
                                  const valueToSend = ethers.parseEther(
                                    (Number.parseFloat(amountToFill) * Number.parseFloat(order.price)).toString()
                                  )

                                  const tx = await crowdfillContract.fillOrder(order.id, amountInWei, {
                                    value: valueToSend,
                                  })

                                  await tx.wait()
                                  alert("Order filled successfully!")
                                  refreshData()
                                }
                              } catch (error) {
                                console.error("Error filling order:", error)
                                alert("Error filling order: " + error.message)
                              }
                            }}
                          >
                            Fill Order
                          </button>
                        </div>
                      )}

                      {order.seller.toLowerCase() === account.toLowerCase() && (
                        <div className="order-actions">
                          <button
                            className="cancel-btn"
                            onClick={async () => {
                              try {
                                if (Number.parseFloat(order.filled) > 0) {
                                  const tx = await crowdfillContract.closeOrder(order.id)
                                  await tx.wait()
                                  alert("Order closed successfully!")
                                } else {
                                  const tx = await crowdfillContract.cancelOrder(order.id)
                                  await tx.wait()
                                  alert("Order cancelled successfully!")
                                }
                                refreshData()
                              } catch (error) {
                                console.error("Error cancelling/closing order:", error)
                                alert("Error: " + error.message)
                              }
                            }}
                          >
                            {Number.parseFloat(order.filled) > 0 ? "Close Order" : "Cancel Order"}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">
                  <p>No active orders found. Create an order to get started!</p>
                  <button className="create-order-btn" onClick={() => (window.location.href = "#create-order")}>
                    Create Order
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        <section className="faq-section" id="faq">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Crowdfill</p>
          </div>

          <div className="faq-container">
            <div className="faq-item">
              <h3>What is Crowdfill?</h3>
              <p>
                Crowdfill is a decentralized OTC (Over-The-Counter) marketplace for ERC20 tokens. It allows users to
                create and fill orders with partial fills, providing a secure and transparent way to trade tokens
                directly.
              </p>
            </div>

            <div className="faq-item">
              <h3>How does partial filling work?</h3>
              <p>
                Partial filling allows buyers to purchase only a portion of an order. For example, if someone is selling
                1000 tokens, you can choose to buy just 200 of them. This provides flexibility for both buyers and
                sellers.
              </p>
            </div>

            <div className="faq-item">
              <h3>What are the fees?</h3>
              <p>
                Crowdfill charges a 0.5% platform fee on successful trades. This fee is automatically calculated and
                deducted during the transaction. There are no hidden fees or charges.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is Crowdfill secure?</h3>
              <p>
                Yes, Crowdfill is built on Ethereum blockchain technology, ensuring security and transparency. All
                transactions are verified and recorded on the blockchain, and the smart contract has been designed with
                security best practices.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I cancel my order?</h3>
              <p>
                Yes, you can cancel your order if it hasn't been filled yet. If your order has been partially filled,
                you can close it to retrieve the remaining tokens.
              </p>
            </div>

            <div className="faq-item">
              <h3>Which wallets are supported?</h3>
              <p>
                Crowdfill supports MetaMask and other Web3 wallets that are compatible with Ethereum. Simply connect
                your wallet to start trading.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer crowdfillAddress={CROWDFILL_ADDRESS} tokenAddress={TEST_TOKEN_ADDRESS} />
    </div>
  )
}

export default App