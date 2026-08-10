# 🚛 FleetDash

**FleetDash** is a collaborative full-stack fleet management system designed to help organizations manage vehicles, drivers, trips, alerts, authentication, and real-time fleet activity through a centralized dashboard.

The project was developed collaboratively using GitHub, with separate contributions across the frontend, backend, database, and project integration workflow.

---

## ✨ Features

* 🔐 User authentication and authorization
* 👥 Role-based access control
* 🚗 Vehicle management and CRUD operations
* 👨‍✈️ Driver management and CRUD operations
* 🛣️ Trip management
* 📍 Vehicle location and tracking support
* 🔔 Alerts management
* 📊 Dashboard and reporting APIs
* ⚡ Real-time updates using Socket.IO
* 🛡️ Backend security middleware
* 🗄️ MongoDB database integration
* 🗺️ Interactive map support using Leaflet
* 🔄 REST API based frontend-backend communication

---

## 🏗️ Project Architecture

```text
FleetDash/
│
├── frontend/              # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   └── utils/
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   └── simulate.js
│
├── Database/              # Database-related resources
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* React Leaflet
* Leaflet
* Socket.IO Client
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcryptjs
* Redis
* Helmet
* Express Rate Limit
* CORS

---

## 🔄 How It Works

```text
        ┌──────────────────────┐
        │      React UI        │
        │      Frontend        │
        └──────────┬───────────┘
                   │
          REST API / Socket.IO
                   │
                   ▼
        ┌──────────────────────┐
        │   Node.js + Express  │
        │       Backend        │
        └──────────┬───────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
   ┌─────────────┐   ┌─────────────┐
   │   MongoDB   │   │    Redis    │
   │  Database   │   │  Real-time  │
   └─────────────┘   └─────────────┘
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pankaj70768/Fleetdash.git
cd Fleetdash
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using the provided `.env.example` file.

Configure the required environment variables such as the MongoDB connection string, authentication secrets, and server configuration.

Start the backend:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

## 💻 Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

---

## 🌱 Database Seeding

The backend includes a seed script for populating initial data.

```bash
cd backend
npm run seed
```

---

## 📡 Real-Time Simulation

FleetDash also includes a simulation script for testing real-time fleet activity.

```bash
npm run simulate
```

---

## 👥 Team Contributions

FleetDash was developed as a collaborative GitHub project with responsibilities divided across different parts of the system.

| Contributor                      | Responsibility                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Aditi Koparde**                | Frontend development, UI structure, navigation, frontend integration and Socket.IO client                                     |
| **Chakradhar Chowdary Sarupuru** | Backend development, MongoDB integration, APIs, authentication, authorization, security and real-time Socket.IO functionality |
| **Pankaj**                       | Project integration, pull request review, branch management and coordination of frontend/backend/database changes             |

### Pankaj — Project Integration & Code Review

Responsibilities included:

* Reviewing team pull requests
* Verifying changes before merging
* Maintaining the main branch
* Coordinating integration between frontend and backend
* Reviewing the overall project structure
* Helping maintain a consistent GitHub-based development workflow

---

## 🔀 GitHub Workflow

The project followed a collaborative Git workflow:

```text
Feature Branch
      │
      ▼
Development
      │
      ▼
Pull Request
      │
      ▼
Code Review
      │
      ▼
Merge into main
```

Team members developed features on separate branches and submitted pull requests for integration into the main branch.

The repository contains **24 merged pull requests**, covering frontend, backend, database, authentication, trip management, real-time communication, security, and project integration.

---

## 🔒 Security

The backend includes several security-related components:

* JWT-based authentication
* Password hashing with bcryptjs
* Helmet security middleware
* CORS configuration
* Express rate limiting
* Environment-based configuration
* Role-based authorization

Sensitive environment variables should be stored in `.env` and must not be committed to the repository.

---

## 📌 Current Project Structure

FleetDash is organized into three major development areas:

### Frontend

Responsible for the user-facing dashboard, navigation, vehicle/trip interfaces, authentication flow, maps and real-time client communication.

### Backend

Responsible for APIs, authentication, authorization, business logic, security, database communication and real-time server events.

### Database

Responsible for MongoDB/Mongoose data structures, database configuration and supporting database resources.

---

## 🔮 Future Improvements

Potential future improvements include:

* Advanced fleet analytics
* Improved route optimization
* More detailed reporting dashboards
* Automated notifications
* Advanced driver performance analytics
* Production deployment
* Automated testing and CI/CD
* Enhanced real-time tracking capabilities

---

## 📄 License

This project is developed as a collaborative academic/team project.

---

## 👨‍💻 Contributors

**Pankaj**
Project Integration & Code Review

**Aditi Koparde**
Frontend Development

**Chakradhar Chowdary Sarupuru**
Backend & Database Development

---

## ⭐ Project

**FleetDash — Collaborative Fleet Management System**

Built with React, Node.js, Express, MongoDB and Socket.IO.
