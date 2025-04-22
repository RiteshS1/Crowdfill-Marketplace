"use client"

import { useState, useEffect } from "react"
import "./Navbar.css"

const Navbar = ({ account, connectWallet, tokenBalance, ethBalance }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#6c5ce7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 8L8 16" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8H16V12" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 12H12V16" stroke="#6c5ce7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>Crowdfill</h1>
            <p>OTC Marketplace</p>
          </div>
        </div>

        <div className="navbar-links-container">
          <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="#marketplace" onClick={() => setMenuOpen(false)}>
                Marketplace
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-wallet">
          {account ? (
            <div className="account-info">
              <div className="balances">
                <p>
                  <span>{Number.parseFloat(ethBalance).toFixed(4)}</span> ETH
                </p>
                <p>
                  <span>{Number.parseFloat(tokenBalance).toFixed(4)}</span> TEST
                </p>
              </div>
              <div className="address-container">
                <p className="address">{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</p>
                <div className="address-indicator"></div>
              </div>
            </div>
          ) : (
            <button className="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`hamburger ${menuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
