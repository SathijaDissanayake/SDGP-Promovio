import { useNavigate } from "react-router-dom";
import "./Pricing.css";

const PricingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const pricingTiers = [
    {
      name: "Pricing",
      price: "$29.99",
      period: "month",
      features: [
        "AI-Powered Content Recommendations",
        "Cross-Platform Social Media Posting",
        "Campaign Analytics Dashboard",
        "Marketing Spend Tracker",
        "Load Management",
      ],
      cta: "Pay now",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$79.99",
      period: "month",
      features: [
        "All features in the Starter plan, plus",
        "Customizable Reports",
        "Advanced AI Insights",
        "Team Collaboration",
        "Dedicated Support",
      ],
      cta: "Pay now",
      highlighted: true,
    },
    {
      name: "Business",
      price: "$149.99",
      period: "month",
      features: [
        "All features in the Growth plan, plus",
        "Priority Customer Support",
        "API Integrations",
        "Advanced Reporting Customizations",
      ],
      cta: "Pay now",
      highlighted: false,
    },
  ];

  const handlePayment = (tier) => {
    // Pass the selected tier as state to the checkout page
    navigate("/checkout", { state: { tier } });
  };

  return (
    <div className="pricing-page">
      <div className="background-circle"></div>
      <div className="pricing-container">
        {pricingTiers.map((tier, index) => (
          <div
            key={index}
            className={`pricing-tier ${tier.highlighted ? "highlighted" : ""}`}
          >
            <h2 className="tier-name">{tier.name}</h2>
            <p className="tier-price">
              {tier.price} <span className="tier-period">/{tier.period}</span>
            </p>
            <ul className="tier-features">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handlePayment(tier)} // Pass the tier object here
              className="tier-cta"
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
