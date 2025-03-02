import "./ContentGrid.css"
import { HeartIcon, CommentIcon, ShareIcon, InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from "./Icons"

const posts = [
  {
    id: 1,
    platform: "instagram",
    icon: <InstagramIcon />,
    username: "gauravchakrawarti2003",
    date: "17 Feb 2024, 11:30 AM",
    image: "/placeholder.svg?height=200&width=200",
    likes: 120,
    comments: 45,
    shares: 12,
  },
  {
    id: 2,
    platform: "facebook",
    icon: <FacebookIcon />,
    username: "gaurav-chakrawarti",
    date: "17 Feb 2024, 11:30 AM",
    image: "/placeholder.svg?height=200&width=200",
    likes: 89,
    comments: 23,
    shares: 7,
  },
  {
    id: 3,
    platform: "linkedin",
    icon: <LinkedInIcon />,
    username: "gauravchakrawarti123415",
    date: "17 Feb 2024, 11:30 AM",
    image: "/placeholder.svg?height=200&width=200",
    likes: 56,
    comments: 8,
    shares: 15,
  },
  {
    id: 4,
    platform: "twitter",
    icon: <TwitterIcon />,
    username: "gaurav123410",
    date: "17 Feb 2024, 11:30 AM",
    image: "/placeholder.svg?height=200&width=200",
    likes: 210,
    comments: 32,
    shares: 45,
  },
  {
    id: 5,
    platform: "empty",
    icon: null,
    username: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 6,
    platform: "empty",
    icon: null,
    username: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 7,
    platform: "empty",
    icon: null,
    username: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 8,
    platform: "empty",
    icon: null,
    username: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: 9,
    platform: "empty",
    icon: null,
    username: "",
    date: "",
    image: "",
    likes: 0,
    comments: 0,
    shares: 0,
  },
]

const ContentGrid = () => {
  return (
    <div className="content-grid">
      {posts.map((post) => (
        <div key={post.id} className={`post-card ${post.platform === "empty" ? "empty-card" : ""}`}>
          {post.platform === "empty" ? (
            <div className="empty-placeholder">
              <div className="plus-icon">+</div>
            </div>
          ) : (
            <>
              <div className="post-header">
                <div className="platform-icon">{post.icon}</div>
                <div className="post-info">
                  <div className="username">{post.username}</div>
                  <div className="post-date">{post.date}</div>
                </div>
              </div>
              <div className="post-image">
                <img src={post.image || "/placeholder.svg"} alt="Post content" />
              </div>
              <div className="post-actions">
                <div className="action-button">
                  <HeartIcon />
                  <span className="count">{post.likes}</span>
                </div>
                <div className="action-button">
                  <CommentIcon />
                  <span className="count">{post.comments}</span>
                </div>
                <div className="action-button">
                  <ShareIcon />
                  <span className="count">{post.shares}</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ContentGrid

