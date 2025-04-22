import "./HowItWorks.css"

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Simple, secure, and transparent token trading</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
            </svg>
          </div>
          <h3>Connect Wallet</h3>
          <p>
            Connect your Ethereum wallet to access the platform. We support MetaMask and other popular Web3 wallets.
          </p>
        </div>

        <div className="step">
          <div className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5Z"></path>
              <path d="m3 8 1.5 2L3 12l1.5 2L3 16l1.5 2L3 20h18v-2l-1.5-2L21 14l-1.5-2L21 10l-1.5-2L21 6l-1.5-2L21 2H3l1.5 2L3 6l1.5 2Z"></path>
            </svg>
          </div>
          <h3>Create an Order</h3>
          <p>
            Specify the token amount and price per token. Approve the token transfer and create your order on the
            blockchain.
          </p>
        </div>

        <div className="step">
          <div className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3>Fill Orders</h3>
          <p>Browse available orders in the marketplace. Fill orders partially or completely with just a few clicks.</p>
        </div>

        <div className="step">
          <div className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22v-5"></path>
              <path d="M9 8V2"></path>
              <path d="M15 8V2"></path>
              <path d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M12 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
            </svg>
          </div>
          <h3>Manage Orders</h3>
          <p>Track your orders and transaction history. Close or cancel your orders at any time with full control.</p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature">
          <div className="feature-icon">
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
              <path d="M2 9V5c0-1.1.9-2 2-2h4"></path>
              <path d="M2 15v4c0 1.1.9 2 2 2h4"></path>
              <path d="M22 9V5c0-1.1-.9-2-2-2h-4"></path>
              <path d="M22 15v4c0 1.1-.9 2-2 2h-4"></path>
              <path d="M7 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M17 7v0"></path>
              <path d="M17 17v0"></path>
            </svg>
          </div>
          <h4>Partial Fills</h4>
          <p>Fill orders partially or completely based on your needs.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h4>Secure Trading</h4>
          <p>All transactions are secured by blockchain technology.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
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
              <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"></path>
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
          </div>
          <h4>Low Fees</h4>
          <p>Only 0.5% platform fee on successful trades.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
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
              <path d="M14 4h6v6h-6z"></path>
              <path d="M4 14h6v6H4z"></path>
              <path d="M17 17v-3a4 4 0 0 0-4-4H9"></path>
              <path d="M7 7V4"></path>
            </svg>
          </div>
          <h4>Full Transparency</h4>
          <p>All orders and fills are visible on the blockchain.</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
