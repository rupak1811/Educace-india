"use client"

import { useRouter } from "next/navigation"
import "../globals.css"

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="app-container">
      <div className="mobile-container">
        <div className="profile-screen">
          <div className="profile-header">
            <h1 className="profile-title">Account Settings</h1>
          </div>

          <div className="profile-content">
            <div className="profile-info">
              <div className="profile-avatar">
                <img src="/placeholder.svg?height=60&width=60" alt="Profile" className="avatar-image" />
                <div className="online-indicator"></div>
              </div>
              <div className="profile-details">
                <h2 className="profile-name">Marry Doe</h2>
                <p className="profile-email">Marry@Gmail.Com</p>
              </div>
            </div>

            <div className="profile-description">
              <p>
                Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
                Labore Et Dolore Magna Aliquyam Erat, Sed Diam.
              </p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-secondary" onClick={() => router.push("/")}>
              Back to Welcome
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
