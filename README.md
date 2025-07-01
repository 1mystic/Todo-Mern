# Mood Todo

A full-stack, mood-based todo app built with the MERN stack. Organize your tasks, track your moods, and boost your productivity with a unique, anime-inspired brutalist UI.

## Features
- User authentication (JWT, secure, email/password)
- Create, read, update, delete (CRUD) tasks
- Each task is tied to a mood (e.g., Focused, Happy, Sad, Inspired, Stressed)
- Filter tasks by mood
- Mark tasks as complete/incomplete
- All data is private to each user
- Responsive, modern UI (React + Tailwind CSS)

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Vercel (deployment)
- **Backend:** Node.js, Express, MongoDB (Atlas), Mongoose, Render (deployment)
- **Auth:** JWT, bcryptjs

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/mood-todo.git
cd mood-todo
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Fill in your MongoDB URI and JWT secret
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

- The backend runs on `http://localhost:5000`
- The frontend runs on `http://localhost:5173`

## Deployment

### Backend (Render)
- Connect your repo to [Render](https://render.com/)
- Set environment variables (`MONGODB_URI`, `JWT_SECRET`)
- Set build/start command: `npm install && npm start`

### Frontend (Vercel)
- Connect your repo to [Vercel](https://vercel.com/)
- Set environment variable `VITE_API_URL` to your Render backend URL (e.g., `https://your-backend.onrender.com/api`)
- Deploy!

## Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env` or Vercel dashboard)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Folder Structure
```
root/
  backend/    # Express/MongoDB API
  frontend/   # React/Tailwind client
```

## License
None