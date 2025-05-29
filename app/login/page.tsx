"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../globals.css"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Simulate successful login
      router.push("/profile")
    }, 1000)
  }

  const isFormValid = formData.email.trim() && formData.password.trim() && Object.keys(errors).length === 0

  return (
    <div className="app-container">
      <div className="mobile-container">
        <div className="auth-screen">
          <div className="auth-header">
            <h1 className="auth-title">
              Sign in to your
              <br />
              PopX account
            </h1>
            <p className="auth-subtitle">
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit,
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={`form-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`form-input ${errors.password ? "error" : ""}`}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className={`btn ${isFormValid && !isSubmitting ? "btn-primary" : "btn-disabled"}`}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <button className="link-button" onClick={() => router.push("/signup")}>
              Don't have an account? Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
