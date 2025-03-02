import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const { tier } = location.state || {}; // Safe fallback to empty object

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [otp, setOtp] = useState(""); // OTP input state
  const [step, setStep] = useState("card"); // Tracks the stage of payment process

  if (!tier) {
    return <div>Error: No plan selected!</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Processing payment... Please enter OTP.");
    setStep("otp"); // Move to OTP step
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "123456") { // Simulating OTP validation
      setStep("success");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="pricing-details">
        <h2>{tier.name} Plan</h2>
        <p>Price: {tier.price} per {tier.period}</p>
        <ul>
          {tier.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {step === "card" && (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Enter your payment details</h3>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="XXX"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Pay Now</button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <h3>Enter OTP</h3>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === "success" && (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <p>Thank you for purchasing the {tier.name} Plan.</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
