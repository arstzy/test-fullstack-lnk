# MERN Stack Application

This project is a MERN stack application designed as a technical test. It includes user authentication features and a simple CRUD interface for managing email data, complete with email sending capabilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Application Evidence](#application-evidence)

## Features

1. **User Authentication**
   - Login and logout functionality, with timestamps recorded in the database.

2. **CRUD Operations**
   - Create, Read, Update, and Delete functionalities for managing email data.
   - Data displayed in a list in calendar

3. **Email Sending**
   - Send emails using a predefined template:
     ```
     Hi Salam kenal
     ```

4. **TypeScript**
   - The application is built using TypeScript for both the frontend and backend.

## Technologies Used

- **Backend:**
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - Nodemailer (for sending emails)
  - TypeScript

- **Frontend:**
  - React
  - Vite
  - Axios (for API calls)
  - React Big Calendar
  - Tailwind CSS (for styling)
  - React Hook Form (for form handling)
  - Yup (for validation)

## Environment Variables

### Backend (.env)

```plaintext
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

### Frontend (.env)

```plaintext
VITE_API_URL=http://localhost:3000/api
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/arstzy/test-fullstack-lnk.git
   cd test-fullstack-lnk
   ```

2. **Ensure MongoDB is running locally:**
   Make sure you have MongoDB installed and running on your machine. You can start MongoDB with the following command:
   
   ```bash
   mongod
   ```
   
   or you can using Docker for running the mongodb
   ```bash
   docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=yourUsername -e MONGO_INITDB_ROOT_PASSWORD=yourPassword mongo

   ```


2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```
3. **Install backend dependencies:**
    
    ```bash
    npm install
    ```
4. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```
5. **Install frontend dependencies:**

    ```bash
    npm install
    ```

## Running the application

### Backend

1. **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```
    The backend server will run on http://localhost:3000.

### Frontend

1. **Start the frontend application:**

    ```bash
    cd frontend
    npm run dev
    ```
    The frontend application will run on http://localhost:5173

## Application Evidence

You can see the application in action at the following link:

[View Running Application](https://jam.dev/c/7491c472-e633-41e4-a558-3456da3905bb)



