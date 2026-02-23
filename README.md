🚀 Task Tracker – Full Stack MERN Application

A full-stack Task Tracker application built using React, Node.js, Express, and MongoDB Atlas, deployed on Vercel (Frontend) and Render (Backend).

Live Demo:
🔗 Frontend: https://task-tracker-fullstack-xi.vercel.app
🔗 Backend API: https://task-tracker-fullstack-16jw.onrender.com/tasks

📌 Features
✅ Create Tasks
✏️ Edit Tasks
🔄 Toggle Complete / Undo
❌ Delete Tasks
🌐 Fully deployed full-stack app
🗄 Persistent data using MongoDB Atlas
🔐 Environment variable configuration
🔄 RESTful API design
⚡ Async/Await with proper error handling

🏗 Architecture
User → Vercel (React Frontend)
        ↓
      Render (Node + Express API)
        ↓
   MongoDB Atlas (Cloud Database)

Tech Stack:
Frontend - 
React (Hooks: useState, useEffect)
Fetch API
Component-based architecture
Immutable state updates

Backend - 
Node.js
Express.js
Mongoose (ODM)
REST APIs (GET, POST, PUT, DELETE)
CORS configuration
Environment variables (.env)

Database - 
MongoDB Atlas (Cloud NoSQL database)
Mongoose Schema & Model

Deployment - 
Vercel (Frontend)
Render (Backend)
GitHub (Version Control)

📂 Project Structure
task-tracker-fullstack/
│
├── task-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── App.jsx
│   │   └── App.css
│
├── task-backend/
│   ├── models/
│   │   └── Task.js
│   ├── index.js
│   ├── package.json
│   └── .env (not committed)
│
└── README.md

⚙️ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/asharon12/task-tracker-fullstack.git
cd task-tracker-fullstack

2️⃣ Setup Backend
cd task-backend
npm install

Create a .env file inside task-backend:

MONGO_URI=mongodb+srv://sharonarputharaj_db_user:3VKTyLAPSn6q6erg@cluster01.7fupmtl.mongodb.net/?appName=Cluster01

Start backend:
node index.js

Backend runs on:
http://localhost:3000

3️⃣ Setup Frontend
cd task-frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

🔌 API Endpoints
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create new task
PUT	/tasks/:id	Update task
DELETE	/tasks/:id	Delete task
