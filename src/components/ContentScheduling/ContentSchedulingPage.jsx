"use client"

import { useState } from "react"
import "./ContentScheduling.css"
import ContentGrid from "./ContentGrid"
import Calendar from "./Calendar"
import Analytics from "./Analytics"
import { PlusIcon, CalendarIcon } from "./Icons"

const ContentScheduling = () => {
  const [activeTab, setActiveTab] = useState("scheduled")

  return (
    <div className="content-scheduling">
      <div className="content-header">
        <h1>Content Scheduling</h1>
        <div className="search-customers">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">Search Customers</button>
        </div>
      </div>

      <div className="content-actions">
        <div className="action-buttons">
          <button className="create-btn">
            <span className="icon">
              <PlusIcon />
            </span>
            Create
          </button>
          <button className="calendar-btn">
            <span className="icon">
              <CalendarIcon />
            </span>
            View Calendar
          </button>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "scheduled" ? "active" : ""}`}
            onClick={() => setActiveTab("scheduled")}
          >
            Scheduled Post
          </button>
          <button className={`tab ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
            Recent Post
          </button>
        </div>
      </div>

      <div className="content-body">
        <div className="content-main">
          <ContentGrid />
        </div>
        <div className="content-sidebar">
          <Calendar />
          <Analytics />
        </div>
      </div>
    </div>
  )
}

export default ContentScheduling

