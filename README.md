# Milestone Tracker

A **full-stack web application** for tracking milestones, featuring a **Spring Boot** backend , **PostgreSQL** database (NeonDB), and **React** frontend styled with **Tailwind CSS** and **Radix UI**. The project allows users to register, log in, create milestones, mark them as completed, and track progress over time.

---

## Features

* **User Authentication**: JWT-based login and registration.
* **Milestone Management**: Add, update, delete, and mark milestones as completed.
* **Progress Tracking**: View milestones by status.
* **Secure API**: Spring Security with JWT.
* **Persistent Data**: PostgreSQL database hosted on **NeonDB**.
* **Deployment**:

  * Hosted on **Render** (may take **\~30 seconds** to start due to free tier cold start).

---

## Tech Stack

* **Frontend**: React (client/), Tailwind CSS, Radix UI
* **Backend**: Spring Boot (server/), Spring Security, JWT
* **Database**: PostgreSQL (NeonDB)
* **Deployment**: Render (full-stack)

---

## Getting Started

### **1. Clone & Run**

```bash
git clone https://github.com/Skywalker690/Milestone-Tracker.git
cd Milestone-Tracker

# Backend
cd server
./mvnw spring-boot:run

# Frontend
cd ../client
npm install
npm start
```

### **2. Environment Variables**

* `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`
* `REACT_APP_API_URL`

---

## Live Demo

* **Live App**: [milestone-tracker.vercel.app](https://milestone-tracker-e1nkp9kuy-skywalker690s-projects.vercel.app)

*(Backend may take \~30s to wake up)*

---

## Future Enhancements

* Add milestone categories and tags
* Add charts/analytics for milestone completion trends
* Enable email notifications for due milestones

---

© 2025 All rights reserved. Skywalker690 ❤️
