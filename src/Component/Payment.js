import React, { useState } from "react";
import "../styles/Payment.css"; // Import the CSS file for styles
import { useLocation, useNavigate } from 'react-router-dom';
import logoCard from "../icons/logo_card.png";
import cardIcon from "../icons/credit-card.png";
import infoIcon from "../icons/info.png";


const Payment = () => {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [expirationError, setExpirationError] = useState(""); // Add expiration error state
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const { formData, ticketDetails } = location.state || {};


    // Validate form fields
    const validateForm = () => {
      setIsFormValid(
        fullName && cardNumber && expiration && !expirationError && cvv && address ? true : false
      );
    };


  // Validate the expiration date for Visa cards
  const validateExpiration = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Matches MM/YYYY format
    if (regex.test(value)) {
      const [month, year] = value.split("/").map(Number);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      // Check if the month is between 01 and 12
      if (month < 1 || month > 12) {
        setExpirationError("Month must be between 01 and 12.");
      } else if (year < currentYear || (year === currentYear && month >= currentMonth)) {
        setExpirationError(""); // Clear error if date is valid
      } else {
        setExpirationError("Expiration date must be in the future.");
      }
    } else if (value.length === 7) {
      setExpirationError("Invalid format. Use MM/YYYY.");
    } else {
      setExpirationError("");
    }
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value;

    // Remove any non-numeric characters except for '/'
    value = value.replace(/[^0-9/]/g, "");

    // Automatically insert the slash after 2 digits (MM/YYYY format)
    if (value.length === 2 && !value.includes("/")) {
      value = value + "/"; // Add the slash after MM
    }

    // Limit the length to 6 characters (MM/YYYY format)
    if (value.length > 7) {
      value = value.slice(0, 7); // Ensure the input does not exceed 7 characters
    }

    setExpiration(value);
    validateExpiration(value);
    validateForm();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
      // Navigate to Ticket page after successful submission
      navigate("/ticket", { state: { formData, ticketDetails } });
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <div className="payment-card-header">
          <img src={logoCard} alt="logo" className="logoCard" />
          <h1 className="payment-title">Payment Information</h1>
        </div>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="full-name" className="form-label">Full Name</label>
            <input
              type="text"
              id="full-name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                validateForm();
              }}
              placeholder="Alex Montoya"
              required
              className="input-field"
            />
          </div>

          <div className="icon-group-container">
            <label htmlFor="card-number" className="form-label">Card Number</label>
            <div className="icon-group">
              <input
                type="text"
                id="card-number"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only digits and validate length
                  if (/^\d*$/.test(value) && value.length <= 16) {
                    setCardNumber(value);
                  }

                  // Check if card number has exactly 16 digits
                  if (value.length === 16) {
                    validateForm();
                  }
                }}
                placeholder="1234 1234 1234 1234"
                required
                className="input-field"
              />
              <img
                id="card-icon"
                src={cardIcon}
                alt="Card icon"
                height="14"
                width="14"
                className="icon"
              />
            </div>
          </div>

          <div className="row-group">
            <div className="form-group">
              <label htmlFor="expiration" className="form-label">Expiration Date</label>
              <input
                type="text"
                id="expiration"
                value={expiration}
                onChange={handleExpirationChange}
                placeholder="MM/YYYY"
                required
                className="input-field"
              />
              {expirationError && <p style={{ color: "red" }}>{expirationError}</p>} {/* Show error */}
            </div>
            <div className="icon-group-container">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <div className="icon-group">
                <input
                  type="tel"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value);
                    validateForm();
                  }}
                  placeholder="···"
                  maxLength="3"
                  required
                  className="input-field"
                />
                <img
                  id="info-icon"
                  src={infoIcon}
                  alt="Info icon"
                  height="14"
                  width="14"
                  className="icon"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                validateForm();
              }}
              placeholder="Av. Morelos 123"
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className={`submit-btn ${isFormValid ? "" : "disabled"}`}
            disabled={!isFormValid}
          >
            Confirm Payment
          </button>
        </form>
        <div className="verify-info">
          <small>Verify the information is correct</small>
        </div>
      </div>
    </div>
  );
};


export default Payment;
