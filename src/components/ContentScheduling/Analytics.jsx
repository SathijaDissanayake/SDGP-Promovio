import "./Analytics.css"
import { InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from "./Icons"

const accounts = [
  {
    id: 1,
    platform: "instagram",
    icon: <InstagramIcon />,
    username: "gauravchakrawarti2003",
  },
  {
    id: 2,
    platform: "facebook",
    icon: <FacebookIcon />,
    username: "gaurav-chakrawarti",
  },
  {
    id: 3,
    platform: "twitter",
    icon: <TwitterIcon />,
    username: "gaurav21420",
  },
  {
    id: 4,
    platform: "linkedin",
    icon: <LinkedInIcon />,
    username: "gauravchakrawarti123415",
  },
  {
    id: 5,
    platform: "linkedin",
    icon: <LinkedInIcon />,
    username: "gauravchakrawarti123415",
  },
  {
    id: 6,
    platform: "linkedin",
    icon: <LinkedInIcon />,
    username: "gauravchakrawarti123415",
  },
  {
    id: 7,
    platform: "linkedin",
    icon: <LinkedInIcon />,
    username: "gauravchakrawarti123415",
  },
]

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2 className="section-title">Analytics</h2>

      <div className="accounts-list">
        {accounts.map((account) => (
          <div key={account.id} className="account-item">
            <div className={`account-icon ${account.platform}`}>{account.icon}</div>
            <div className="account-username">{account.username}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics

