"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../globals.css"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "no",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

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

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      isAgency: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Simulate successful signup
      router.push("/profile")
    }, 1000)
  }

  const isFormValid =
    formData.fullName.trim() &&
    formData.phoneNumber.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    Object.keys(errors).length === 0

  return (
    <div className="app-container">
      <div className="mobile-container">
        <div className="auth-screen">
          <div className="auth-header">
            <h1 className="auth-title">
              Create your
              <br />
              PopX account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label required">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Marry Doe"
                className={`form-input ${errors.fullName ? "error" : ""}`}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required">Phone number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Marry Doe"
                className={`form-input ${errors.phoneNumber ? "error" : ""}`}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required">Email address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Marry Doe"
                className={`form-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label required">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Marry Doe"
                className={`form-input ${errors.password ? "error" : ""}`}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Company name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Marry Doe"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Are you an Agency?*</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={formData.isAgency === "yes"}
                    onChange={() => handleRadioChange("yes")}
                  />
                  <span className="radio-custom"></span>
                  Yes
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={formData.isAgency === "no"}
                    onChange={() => handleRadioChange("no")}
                  />
                  <span className="radio-custom"></span>
                  No
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`btn ${isFormValid && !isSubmitting ? "btn-primary" : "btn-disabled"}`}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <button className="link-button" onClick={() => router.push("/login")}>
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
