"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../styles/main.css"

interface RegistrationData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  password: string
  companyName: string
  agencyStatus: string
}

interface FormErrors {
  fullName?: string
  phoneNumber?: string
  emailAddress?: string
  password?: string
}

export default function RegistrationScreen() {
  const navigate = useRouter()
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    companyName: "",
    agencyStatus: "no",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmailAddress = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneFormat = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateRegistrationForm = (): boolean => {
    const errors: FormErrors = {}

    if (!registrationData.fullName.trim()) {
      errors.fullName = "Full name is required"
    }

    if (!registrationData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required"
    } else if (!validatePhoneFormat(registrationData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number"
    }

    if (!registrationData.emailAddress.trim()) {
      errors.emailAddress = "Email is required"
    } else if (!validateEmailAddress(registrationData.emailAddress)) {
      errors.emailAddress = "Please enter a valid email address"
    }

    if (!registrationData.password.trim()) {
      errors.password = "Password is required"
    } else if (registrationData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const updateFormField = (field: keyof RegistrationData, value: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleAgencySelection = (value: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      agencyStatus: value,
    }))
  }

  const processRegistration = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateRegistrationForm()) return

    setIsSubmitting(true)

    // Simulate registration API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    navigate.push("/dashboard")
  }

  const isRegistrationReady =
    registrationData.fullName.trim() &&
    registrationData.phoneNumber.trim() &&
    registrationData.emailAddress.trim() &&
    registrationData.password.trim() &&
    Object.keys(formErrors).length === 0

  return (
    <div className="app-wrapper">
      <div className="mobile-frame">
        <div className="auth-container">
          <div className="auth-header-section">
            <h1 className="auth-main-title">
              Create your
              <br />
              PopX account
            </h1>
          </div>

          <form onSubmit={processRegistration} className="auth-form-container">
            <div className="input-field-group">
              <label className="field-label required-field">Full Name*</label>
              <input
                type="text"
                value={registrationData.fullName}
                onChange={(e) => updateFormField("fullName", e.target.value)}
                placeholder="Marry Doe"
                className={`text-input-field ${formErrors.fullName ? "input-error" : ""}`}
              />
              {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
            </div>

            <div className="input-field-group">
              <label className="field-label required-field">Phone number*</label>
              <input
                type="tel"
                value={registrationData.phoneNumber}
                onChange={(e) => updateFormField("phoneNumber", e.target.value)}
                placeholder="Marry Doe"
                className={`text-input-field ${formErrors.phoneNumber ? "input-error" : ""}`}
              />
              {formErrors.phoneNumber && <span className="error-text">{formErrors.phoneNumber}</span>}
            </div>

            <div className="input-field-group">
              <label className="field-label required-field">Email address*</label>
              <input
                type="email"
                value={registrationData.emailAddress}
                onChange={(e) => updateFormField("emailAddress", e.target.value)}
                placeholder="Marry Doe"
                className={`text-input-field ${formErrors.emailAddress ? "input-error" : ""}`}
              />
              {formErrors.emailAddress && <span className="error-text">{formErrors.emailAddress}</span>}
            </div>

            <div className="input-field-group">
              <label className="field-label required-field">Password*</label>
              <input
                type="password"
                value={registrationData.password}
                onChange={(e) => updateFormField("password", e.target.value)}
                placeholder="Marry Doe"
                className={`text-input-field ${formErrors.password ? "input-error" : ""}`}
              />
              {formErrors.password && <span className="error-text">{formErrors.password}</span>}
            </div>

            <div className="input-field-group">
              <label className="field-label">Company name</label>
              <input
                type="text"
                value={registrationData.companyName}
                onChange={(e) => updateFormField("companyName", e.target.value)}
                placeholder="Marry Doe"
                className="text-input-field"
              />
            </div>

            <div className="input-field-group">
              <label className="field-label">Are you an Agency?*</label>
              <div className="radio-selection-group">
                <label className="radio-choice">
                  <input
                    type="radio"
                    name="agencyStatus"
                    checked={registrationData.agencyStatus === "yes"}
                    onChange={() => handleAgencySelection("yes")}
                  />
                  <span className="custom-radio"></span>
                  Yes
                </label>
                <label className="radio-choice">
                  <input
                    type="radio"
                    name="agencyStatus"
                    checked={registrationData.agencyStatus === "no"}
                    onChange={() => handleAgencySelection("no")}
                  />
                  <span className="custom-radio"></span>
                  No
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`form-submit-btn ${isRegistrationReady && !isSubmitting ? "btn-active" : "btn-inactive"}`}
              disabled={!isRegistrationReady || isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-navigation">
            <button className="nav-link-btn" onClick={() => navigate.push("/signin")}>
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
