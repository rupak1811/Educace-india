"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../styles/main.css"

interface LoginCredentials {
  userEmail: string
  userPassword: string
}

interface ValidationErrors {
  userEmail?: string
  userPassword?: string
}

export default function SignInScreen() {
  const navigate = useRouter()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    userEmail: "",
    userPassword: "",
  })
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const validateEmailFormat = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(email)
  }

  const performValidation = (): boolean => {
    const errors: ValidationErrors = {}

    if (!credentials.userEmail.trim()) {
      errors.userEmail = "Email is required"
    } else if (!validateEmailFormat(credentials.userEmail)) {
      errors.userEmail = "Please enter a valid email address"
    }

    if (!credentials.userPassword.trim()) {
      errors.userPassword = "Password is required"
    } else if (credentials.userPassword.length < 6) {
      errors.userPassword = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFieldChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!performValidation()) return

    setIsProcessing(true)

    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsProcessing(false)
    navigate.push("/dashboard")
  }

  const isFormReady =
    credentials.userEmail.trim() && credentials.userPassword.trim() && Object.keys(validationErrors).length === 0

  return (
    <div className="app-wrapper">
      <div className="mobile-frame">
        <div className="auth-container">
          <div className="auth-header-section">
            <h1 className="auth-main-title">
              Sign in to your
              <br />
              PopX account
            </h1>
            <p className="auth-sub-description">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit,
            </p>
          </div>

          <form onSubmit={handleFormSubmission} className="auth-form-container">
            <div className="input-field-group">
              <label className="field-label">Email Address</label>
              <input
                type="email"
                value={credentials.userEmail}
                onChange={(e) => handleFieldChange("userEmail", e.target.value)}
                placeholder="Enter email address"
                className={`text-input-field ${validationErrors.userEmail ? "input-error" : ""}`}
              />
              {validationErrors.userEmail && <span className="error-text">{validationErrors.userEmail}</span>}
            </div>

            <div className="input-field-group">
              <label className="field-label">Password</label>
              <input
                type="password"
                value={credentials.userPassword}
                onChange={(e) => handleFieldChange("userPassword", e.target.value)}
                placeholder="Enter password"
                className={`text-input-field ${validationErrors.userPassword ? "input-error" : ""}`}
              />
              {validationErrors.userPassword && <span className="error-text">{validationErrors.userPassword}</span>}
            </div>

            <button
              type="submit"
              className={`form-submit-btn ${isFormReady && !isProcessing ? "btn-active" : "btn-inactive"}`}
              disabled={!isFormReady || isProcessing}
            >
              {isProcessing ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="auth-navigation">
            <button className="nav-link-btn" onClick={() => navigate.push("/register")}>
              Don't have an account? Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
