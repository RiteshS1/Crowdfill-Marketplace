import "./Footer.css"

const Footer = ({ crowdfillAddress, tokenAddress }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <h2>Crowdfill</h2>
            </div>
            <p className="footer-tagline">The decentralized OTC marketplace for ERC20 tokens</p>
            <p className="footer-description">
              Trade tokens directly with partial fills, no intermediaries, and full transparency.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Platform</h3>
              <ul>
                <li>
                  <a href="#marketplace">Marketplace</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li>
                  <a href="#create-order">Create Order</a>
                </li>
                <li>
                  <a href="#fill-order">Fill Order</a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="#docs">Documentation</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#tutorials">Tutorials</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-contracts">
          <div className="contract-info">
            <h3>Smart Contracts</h3>
            <div className="contract-addresses">
              <div className="contract-address">
                <span className="contract-label">Crowdfill:</span>
                <a
                  href={`https://etherscan.io/address/${crowdfillAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contract-link"
                >
                  {crowdfillAddress.substring(0, 8)}...{crowdfillAddress.substring(crowdfillAddress.length - 6)}
                </a>
              </div>
              <div className="contract-address">
                <span className="contract-label">Test Token:</span>
                <a
                  href={`https://etherscan.io/address/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contract-link"
                >
                  {tokenAddress.substring(0, 8)}...{tokenAddress.substring(tokenAddress.length - 6)}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#twitter" className="social-icon" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#discord" className="social-icon" aria-label="Discord">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
                <path d="M7.5 7.2c3.5-1 5.5-1 9 0"></path>
                <path d="M7 16.8c3.5 1 6.5 1 10 0"></path>
                <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
              </svg>
            </a>
            <a href="#github" className="social-icon" aria-label="GitHub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a href="#telegram" className="social-icon" aria-label="Telegram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </a>
          </div>

          <div className="footer-copyright">
            <p>&copy; {currentYear} Crowdfill. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#terms">Terms of Service</a>
              <span className="divider">|</span>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
