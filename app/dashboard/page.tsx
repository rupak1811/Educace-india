"use client"

import { useRouter } from "next/navigation"
import "../styles/main.css"

export default function UserDashboard() {
  const navigate = useRouter()

  return (
    <div className="app-wrapper">
      <div className="mobile-frame">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Account Settings</h1>
          </div>

          <div className="dashboard-content">
            <div className="user-profile-section">
              <div className="profile-avatar-container">
                <img src="/placeholder.svg?height=60&width=60" alt="User Profile" className="profile-avatar-img" />
                <div className="status-indicator"></div>
              </div>
              <div className="user-info">
                <h2 className="user-display-name">Marry Doe</h2>
                <p className="user-email-address">Marry@Gmail.Com</p>
              </div>
            </div>

            <div className="user-bio-section">
              <p>
                Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
                Labore Et Dolore Magna Aliquyam Erat, Sed Diam.
              </p>
            </div>
          </div>

          <div className="dashboard-actions">
            <button className="secondary-action-btn" onClick={() => navigate.push("/")}>
              Back to Welcome
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
