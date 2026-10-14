# MERN Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to manage everyday tasks through a simple, responsive interface connected to a RESTful API.
<img width="1920" height="1080" alt="Screenshot (608)" src="https://github.com/user-attachments/assets/57806b4b-d2fd-4b7a-9a0a-c01b405bb221" />

## Live Demo

**[View the Live Application](https://mern-task-manager-eight-flax.vercel.app/)**

**[View Source Code on GitHub](https://github.com/edinamsam/mern-task-manager)**

**Backend API:** https://mern-task-manager-1bg2.onrender.com

## Features

* **Create Tasks:** Add new tasks with a title.
* **View Tasks:** Retrieve and display tasks stored in MongoDB.
* **Update Tasks:** Mark tasks as completed or pending.
* **Delete Tasks:** Remove tasks from the list.
* **Filter Tasks:** Filter tasks by All, Pending, or Completed.
* **Loading States:** Display feedback while tasks are being retrieved or actions are processing.
* **Error Handling:** Display messages when API requests fail.
* **Persistent Storage:** Store tasks in MongoDB Atlas.
* **Responsive Interface:** Use the application across different screen sizes.

## Tech Stack

### Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Tools and Deployment

* Git and GitHub
* Postman
* Vercel — frontend deployment
* Render — backend deployment

## Application Architecture

The application follows a client-server architecture:

1. The React frontend provides the user interface.
2. The frontend sends HTTP requests to the Express REST API.
3. The backend processes requests and interacts with MongoDB through Mongoose.
4. The API returns responses to the frontend, which updates the displayed tasks.

## API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/tasks`     | Retrieve all tasks    |
| GET    | `/api/tasks/:id` | Retrieve a task by ID |
| POST   | `/api/tasks`     | Create a new task     |
| PATCH  | `/api/tasks/:id` | Update a task         |
| DELETE | `/api/tasks/:id` | Delete a task         |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

* Node.js and npm
* A MongoDB Atlas account or another accessible MongoDB instance
* Git

### 1. Clone the repository

```bash
git clone https://github.com/edinamsam/mern-task-manager.git
cd mern-task-manager
```

### 2. Configure the backend

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and add your MongoDB connection string.

For example, if your backend reads `process.env.MONGO_URI`:

```env
MONGO_URI=your_mongodb_connection_string
```

Use the exact environment variable name referenced in your backend code. Never commit your actual database credentials to GitHub.

Start the backend:

```bash
npm start
```

The backend should run locally on port `5000`, assuming that is the port configured in your application.

### 3. Configure the frontend

Open a second terminal and navigate to the client directory from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

This variable tells the frontend where to find the backend API during local development.

### 4. Start the frontend

From the `client` directory, run:

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

## Environment Variables

| Variable       | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `MONGO_URI`    | MongoDB connection string, if this is the variable name used by the backend |
| `VITE_API_URL` | Base URL of the backend API used by the frontend                            |

The deployed frontend and backend require their respective environment variables to be configured in Vercel and Render.

**Security:** Keep `.env` files and database credentials out of version control. Use `.env.example` files with placeholder values if you want to document the required configuration.

## Key Learnings

Building and deploying this project provided practical experience with:

* Building RESTful APIs using Express.js.
* Implementing CRUD operations with MongoDB and Mongoose.
* Managing React state with `useState` and `useEffect`.
* Fetching and updating data asynchronously.
* Handling loading states, errors, and user interactions.
* Using environment variables to configure frontend and backend services.
* Connecting a frontend to a deployed REST API.
* Troubleshooting CORS and MongoDB Atlas network access.
* Using Git and GitHub for version control.
* Deploying a full-stack application using Vercel, Render, and MongoDB Atlas.

## Future Improvements

* Add user authentication and authorization.
* Associate tasks with individual users.
* Allow users to edit task titles.
* Add due dates and task priorities.
* Improve automated testing and input validation.

## Author

**Edinam Sam**

[GitHub Profile](https://github.com/edinamsam)

---

Built as a hands-on project to strengthen my full-stack JavaScript development skills.
