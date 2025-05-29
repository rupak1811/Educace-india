"use client"

import { useRouter } from "next/navigation"
import "./styles/main.css"

export default function LandingScreen() {
  const navigate = useRouter()

  const handleCreateAccount = () => {
    navigate.push("/register")
  }

  const handleExistingUser = () => {
    navigate.push("/signin")
  }

  return (
    <div className="app-wrapper">
      <div className="mobile-frame">
        <div className="landing-container">
          <div className="content-section">
            <div className="brand-intro">
              <h1 className="brand-title">Welcome to PopX</h1>
              <p className="brand-description">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit,
              </p>
            </div>

            <div className="action-buttons">
              <button className="primary-action-btn" onClick={handleCreateAccount}>
                Create Account
              </button>
              <button className="secondary-action-btn" onClick={handleExistingUser}>
                Already Registered? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
