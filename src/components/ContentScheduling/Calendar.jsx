"use client"

import { useState } from "react"
import "./Calendar.css"
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendarDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    // Previous month days
    const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month">
          {prevMonthDays - i}
        </div>,
      )
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const isToday =
        new Date().getDate() === i &&
        new Date().getMonth() === currentMonth.getMonth() &&
        new Date().getFullYear() === currentMonth.getFullYear()

      days.push(
        <div key={i} className={`calendar-day ${isToday ? "today" : ""} ${i === 6 ? "selected" : ""}`}>
          {i}
        </div>,
      )
    }

    // Next month days
    const remainingCells = 42 - days.length // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day next-month">
          {i}
        </div>,
      )
    }

    return days
  }

  const events = [
    {
      id: 1,
      date: 20,
      title: "Development planning",
      company: "W3IT Technologies",
      time: "12:05 PM",
    },
    {
      id: 2,
      date: 20,
      title: "Development planning",
      company: "W3IT Technologies",
      time: "12:05 PM",
    },
  ]

  return (
    <div className="calendar-container">
      <h2 className="section-title">Upcoming Schedules</h2>

      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={prevMonth}>
          <ChevronLeftIcon />
        </button>
        <div className="current-month">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </div>
        <button className="calendar-nav-btn" onClick={nextMonth}>
          <ChevronRightIcon />
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-day-header">Su</div>
        <div className="calendar-day-header">Mo</div>
        <div className="calendar-day-header">Tu</div>
        <div className="calendar-day-header">We</div>
        <div className="calendar-day-header">Th</div>
        <div className="calendar-day-header">Fr</div>
        <div className="calendar-day-header">Sa</div>

        {renderCalendarDays()}
      </div>

      <div className="events-section">
        <h3 className="events-title">EVENTS</h3>

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                <div className="event-day">{event.date}</div>
                <div className="event-weekday">Mon</div>
              </div>
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-company">{event.company}</div>
              </div>
              <div className="event-time">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar

