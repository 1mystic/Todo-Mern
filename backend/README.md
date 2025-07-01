# Mood Todo Backend

This is the backend for the Mood Todo MERN app.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your MongoDB Atlas connection string and a JWT secret:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```
3. Start the server:
   ```bash
   npm start
   ```

The server will run on port 5000 by default. You should see `Server running on port 5000` and `Connected to MongoDB` if everything is set up correctly.

## Folder Structure

- `src/app.js` - Express app setup (middleware, routes)
- `src/server.js` - Entry point, connects to MongoDB and starts server
- `src/routes/` - Route definitions (to be added)
- `src/controllers/` - Controller logic (to be added)
- `src/models/` - Mongoose models (to be added)
- `src/middleware/` - Custom middleware (to be added)

## Environment Variables

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Secret for JWT authentication 