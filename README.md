<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C6FF,100:0072FF&height=220&section=header&text=FleetDash&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Smart%20Fleet%20Management%20Platform&descAlignY=58&descSize=20" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=3000&pause=1000&color=00C6FF&center=true&vCenter=true&width=750&lines=Track+Vehicles+%F0%9F%9A%9B;Manage+Drivers+%F0%9F%91%A8%5Cu200d%F0%9F%9A%80;Monitor+Trips+%F0%9F%9B%A3%EF%B8%8F;Receive+Real-Time+Updates+%E2%9A%A1;One+Dashboard.+Complete+Fleet+Control." alt="Typing SVG"/>

<br/>

<img src="https://img.shields.io/badge/STATUS-ACTIVE-00C6FF?style=for-the-badge&labelColor=0D1117"/>
<img src="https://img.shields.io/badge/FULL--STACK-0072FF?style=for-the-badge&labelColor=0D1117"/>
<img src="https://img.shields.io/badge/REAL--TIME-SOCKET.IO-00C6FF?style=for-the-badge&labelColor=0D1117"/>

<br/><br/>

<a href="https://github.com/Pankaj70768/Fleetdash">
<img src="https://img.shields.io/badge/VIEW%20SOURCE-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="#-features">
<img src="https://img.shields.io/badge/EXPLORE%20FEATURES-0072FF?style=for-the-badge&logoColor=white"/>
</a>

<br/><br/>

<img src="https://img.shields.io/github/stars/Pankaj70768/Fleetdash?style=flat-square&logo=github"/>
<img src="https://img.shields.io/github/forks/Pankaj70768/Fleetdash?style=flat-square&logo=github"/>
<img src="https://img.shields.io/github/commit-activity/m/Pankaj70768/Fleetdash?style=flat-square&logo=github"/>
<img src="https://img.shields.io/github/last-commit/Pankaj70768/Fleetdash?style=flat-square&logo=github"/>

</div>

---

<div align="center">

## 🚛 `Fleet Management, Reimagined.`

**FleetDash** is a full-stack fleet management platform built to bring
**vehicles, drivers, trips, alerts and real-time fleet activity** into one centralized dashboard.

<br/>

> **Track. Manage. Monitor. Move.**

</div>

---

# 🌐 Why FleetDash?

Managing a fleet means dealing with multiple moving parts at the same time.

FleetDash brings those operations together into a single system.

```text
             ┌─────────────────────────────────┐
             │          🚛 FLEETDASH            │
             │                                 │
             │   Vehicles   Drivers   Trips    │
             │      │         │        │       │
             │      └─────────┼────────┘       │
             │                │                │
             │          📊 Dashboard            │
             │                │                │
             │       ⚡ Real-Time Updates       │
             └─────────────────────────────────┘
```

### 🎯 Built to help teams

* Monitor vehicles
* Manage drivers
* Create and track trips
* Handle alerts
* Control access with roles
* Receive real-time updates
* Work with centralized fleet data

---

# ⚡ Features

<div align="center">

|  🔐 Authentication |    🚛 Vehicles   |   👨‍✈️ Drivers   |
| :----------------: | :--------------: | :---------------: |
| JWT Authentication |   Vehicle CRUD   |    Driver CRUD    |
|  Role-Based Access |  Status Tracking | Driver Management |
|  Protected Routes  | Location Support | Driver Assignment |

|      🛣️ Trips     |  ⚡ Real-Time  | 📊 Operations |
| :----------------: | :-----------: | :-----------: |
|   Trip Management  |   Socket.IO   |   Dashboard   |
| Vehicle Assignment |  Live Events  |     Alerts    |
|     Trip Status    | Fleet Updates |    Reports    |

</div>

---

# 🧠 System Overview

```mermaid
flowchart LR

    USER["👤 Fleet Manager"]

    FRONT["⚛️ React Frontend"]

    API["🚀 Express API"]

    AUTH["🔐 Auth + RBAC"]

    DB[("🍃 MongoDB")]

    SOCKET["⚡ Socket.IO"]

    REDIS[("🔴 Redis")]

    USER --> FRONT

    FRONT -->|"REST API"| API
    FRONT <-->|"Real-Time Events"| SOCKET

    API --> AUTH
    AUTH --> DB

    API --> DB
    API --> SOCKET

    SOCKET --> REDIS
```

---

# ⚙️ Tech Stack

<div align="center">

### 🎨 Frontend

<img src="https://skillicons.dev/icons?i=react,vite,js,html,css" />

<br/><br/>

### ⚙️ Backend

<img src="https://skillicons.dev/icons?i=nodejs,express" />

<br/><br/>

### 🗄️ Database & Real-Time

<img src="https://skillicons.dev/icons?i=mongodb,redis" />

<br/><br/>

### 🛠️ Development

<img src="https://skillicons.dev/icons?i=git,github,vscode,npm" />

</div>

---

# 🏗️ Project Structure

```text
Fleetdash/
│
├── 🎨 frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── ⚙️ backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   └── utils/
│   │
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   └── simulate.js
│
├── 🗄️ Database/
│
├── .gitignore
├── package.json
└── README.md
```

---

# ⚡ Real-Time Engine

FleetDash uses **Socket.IO** to enable real-time communication between the frontend and backend.

```text
                  ⚡ REAL-TIME FLOW

      ┌───────────────┐
      │   🚛 Vehicle  │
      └───────┬───────┘
              │
              │ Event
              ▼
      ┌───────────────┐
      │  ⚡ Socket.IO │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │ 🖥️ Dashboard  │
      └───────────────┘
              │
              ▼
        Instant Update
```

### Real-time capabilities include:

* Vehicle events
* Driver events
* Trip events
* Alert events
* Location-related updates
* Live frontend synchronization

---

# 🔐 Security Layer

The backend implements multiple security mechanisms:

```text
                🔐 REQUEST
                    │
                    ▼
          ┌────────────────────┐
          │ Authentication     │
          └─────────┬──────────┘
                    ▼
          ┌────────────────────┐
          │ Authorization      │
          │     / RBAC         │
          └─────────┬──────────┘
                    ▼
          ┌────────────────────┐
          │ Security Middleware│
          └─────────┬──────────┘
                    ▼
          ┌────────────────────┐
          │    Controller      │
          └─────────┬──────────┘
                    ▼
          ┌────────────────────┐
          │      MongoDB       │
          └────────────────────┘
```

### Included

* 🔑 JWT authentication
* 🔒 Password hashing
* 👮 Role-based authorization
* 🛡️ Helmet
* 🚦 Rate limiting
* 🌐 CORS
* 🔐 Environment variables
* 🛡️ Protected API routes

---

# 🔄 Application Flow

```mermaid
sequenceDiagram

    actor User
    participant UI as React Frontend
    participant API as Express Backend
    participant Auth as Auth/RBAC
    participant DB as MongoDB
    participant Socket as Socket.IO

    User->>UI: Interact with Dashboard

    UI->>API: API Request

    API->>Auth: Validate Request

    Auth->>DB: Read / Write Data
    DB-->>Auth: Database Response

    Auth-->>API: Authorized Response
    API-->>UI: JSON Response

    Socket-->>UI: Real-Time Event
    UI-->>User: Updated Dashboard
```

---

# 📸 Project Preview

<div align="center">

### 🖥️ Dashboard

<img src="docs/screenshots/dashboard.png" width="90%" alt="FleetDash Dashboard"/>

<br/><br/>

### 🚛 Vehicle Management

<img src="docs/screenshots/vehicles.png" width="90%" alt="FleetDash Vehicles"/>

<br/><br/>

### 🛣️ Trip Management

<img src="docs/screenshots/trips.png" width="90%" alt="FleetDash Trips"/>

</div>

> **Replace these images with your actual screenshots.**

---

# 🚀 Getting Started

## 1. Clone

```bash
git clone https://github.com/Pankaj70768/Fleetdash.git
cd Fleetdash
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Then start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 4. Seed Database

```bash
cd backend
npm run seed
```

---

## 5. Run Real-Time Simulation

```bash
npm run simulate
```

---

# 🔀 Git Workflow

FleetDash was developed using a **feature-branch + Pull Request workflow**.

```text
                       ┌───────────────┐
                       │    Feature    │
                       │    Branch     │
                       └───────┬───────┘
                               │
                               ▼
                        💻 Development
                               │
                               ▼
                         📦 Commit
                               │
                               ▼
                       🔃 Pull Request
                               │
                               ▼
                         👀 Code Review
                               │
                               ▼
                          ✅ Approval
                               │
                               ▼
                       🔀 Merge → main
```

This workflow helped keep frontend, backend, database and integration work organized across the team.

---

# 👥 The Team

<div align="center">

<table>
<tr>

<td align="center" width="33%">

## 👨‍💻 Pankaj

### Integration & Code Review

<br/>

🔍 Pull Request Reviews
🔀 Merge Management
🌿 Branch Management
🔗 Module Integration
📋 Main Branch Coordination

</td>

<td align="center" width="33%">

## 👩‍💻 Aditi

### Frontend Development

<br/>

⚛️ React Frontend
🎨 UI Development
🧭 Navigation
📊 Dashboard
⚡ Socket.IO Client
🔗 Frontend Integration

</td>

<td align="center" width="33%">

## 👨‍💻 Chakri

### Backend & Database

<br/>

🚀 Node.js / Express
🍃 MongoDB
🔌 REST APIs
🔐 Authentication
👮 Authorization
⚡ Socket.IO Backend

</td>

</tr>
</table>

</div>

---

# 📊 Project Modules

<div align="center">

```text
╭────────────────────────────────────────────────────────────╮
│                       FLEETDASH                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🔐 Authentication        ████████████████████  COMPLETE   │
│  👮 Authorization         ████████████████████  COMPLETE   │
│  🚛 Vehicles              ████████████████████  COMPLETE   │
│  👨‍✈️ Drivers              ████████████████████  COMPLETE   │
│  🛣️ Trips                ████████████████████  COMPLETE   │
│  📍 Location              ████████████████████  COMPLETE   │
│  🔔 Alerts                ████████████████████  COMPLETE   │
│  ⚡ Real-Time             ████████████████████  COMPLETE   │
│  🎨 Frontend              ████████████████████  COMPLETE   │
│                                                            │
╰────────────────────────────────────────────────────────────╯
```

</div>

---

# 📈 Repository Activity

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=Pankaj70768&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00C6FF&icon_color=00C6FF" width="48%"/>

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Pankaj70768&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=00C6FF" width="40%"/>

</div>

---

# 🐍 Contribution Activity

<div align="center">

<img src="https://raw.githubusercontent.com/Pankaj70768/Pankaj70768/output/github-contribution-grid-snake-dark.svg" width="90%" alt="GitHub Contribution Snake"/>

</div>

---

# 🗺️ Roadmap

```text
                         FLEETDASH ROADMAP

                              │
                              ▼
                    ┌───────────────────┐
                    │     CORE SYSTEM   │
                    │        ✅         │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ REAL-TIME SYSTEM  │
                    │        ✅         │
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             📊 Analytics         🗺️ Tracking
               Planned              Planned
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    ┌───────────────────┐
                    │  🚀 PRODUCTION    │
                    │     DEPLOYMENT    │
                    └───────────────────┘
```

### 🔮 Future Improvements

* [ ] Advanced fleet analytics
* [ ] Route optimization
* [ ] Driver performance analytics
* [ ] Advanced reporting
* [ ] Automated notifications
* [ ] Production deployment
* [ ] CI/CD pipeline
* [ ] Automated testing
* [ ] Enhanced live tracking
* [ ] Mobile application

---

# 🤝 Contributing

Want to improve FleetDash?

```bash
# Create your feature branch
git checkout -b feature/your-feature

# Make your changes
git add .

# Commit
git commit -m "Add: your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

### Contribution Flow

**Fork → Branch → Build → Test → Pull Request → Review → Merge**

---

# 📜 License

This project was developed as a collaborative academic/team project.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0072FF,100:00C6FF&height=120&section=footer&animation=fadeIn" width="100%"/>

# 🚛 FleetDash

### `One Dashboard. Complete Fleet Control.`

<br/>

<img src="https://img.shields.io/badge/BUILT%20WITH-REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/POWERED%20BY-NODE.JS-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/DATABASE-MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/REAL--TIME-SOCKET.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white"/>

<br/><br/>

**Made with code, collaboration & a lot of GitHub commits.** ⚡

<br/>

<a href="https://github.com/Pankaj70768/Fleetdash">
<img src="https://img.shields.io/badge/⭐%20STAR%20THE%20REPOSITORY-0072FF?style=for-the-badge"/>
</a>

</div>
