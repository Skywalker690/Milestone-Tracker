# Milestone Tracker

## Description

A full-stack milestone tracker application built with **React** (frontend) and **Spring Boot** (backend). It allows users to **add, edit, delete, and mark milestones as completed**, with proper API integration and a responsive, user-friendly interface.

## Features ✨

* Add new milestones 📝
* View all milestones 📋
* Edit existing milestones ✏️
* Delete milestones 🗑️
* Mark milestones as completed ✅
* Dark theme & responsive design 🌙📱
* Search, filter, and sort milestones 🔍
* Statistics dashboard 📊

## Tech Stack 💻

* **Backend:** Spring Boot, Java, PostgreSQL
* **Frontend:** React ⚛️
* **Database:** PostgreSQL 🗄️

## Milestone Object Structure 📌

* `id` (Integer): Unique identifier 🔑
* `title` (String): Milestone title 🏷️
* `description` (String): Details of the milestone 📝
* `achieveDate` (Date): Target or actual date 📅
* `completed` (Boolean): Completion status ✅
* `createdDate` (Date): Creation date ⏰
* `completedDate` (Date): Completion date 📅

## Backend API Documentation 📄

The detailed API contracts for all endpoints are provided in a separate file: [`CONTRACT.md`](CONTRACT.md)

## Frontend Integration 💻

* Replace mock data with API calls as per `CONTRACT.md` endpoints
* Handle toggle completion via PUT/PATCH
* Proper error handling and loading states included

## CORS Configuration 🌐

Ensure frontend can access backend:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

## Status ✅

Frontend and backend are now fully integrated and functional.

## 🧑‍💻 Author

**Skywalker690**

GitHub: [@Skywalker690](https://github.com/Skywalker690)


## License 📄

MIT License
