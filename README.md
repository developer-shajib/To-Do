## Task Management App

### Overview

Your Task Management App is built using the following technologies:

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React (with Vite.js), Redux Toolkit
- **Styling**: Tailwind CSS

### Features

1. **User Authentication**:

   - **Login**: Users can log in with their credentials.
   - **Register**: New users can create an account.
   - **Logout**: Users can log out.

2. **Project Management**:

   - **Create Project**: Users can create new projects.
   - **Update Project**: Users can modify project details.

3. **Task Management**:
   - **Create Task**: Users can add tasks to their projects.
   - **Update Task**: Users can edit task details.
   - **Delete Task**: Users can remove tasks.

### Environment Variables

Create separate `.env` files for the client and server folders:

**client `.env`**:

```
VITE_APP_ENVIRONMENT = Development
VITE_PUBLIC_API_URL = http://localhost:5050
```

**server `.env`**:

```
PORT = 5050
MONGO_URL =
ACCESS_TOKEN_SECRET =  Ua3gIViviUBtI2JlxNzvzqBRCVyyCgIGNvk0zxITas
ACCESS_TOKEN_EXPIRE_IN = 7d
```

### Installation

1. Clone this repository.
2. Navigate to the `client` folder and run `npm install`.
3. Navigate to the `server` folder and run `npm install`.

### Usage

1. Start the backend server: `npm start` (from the `server` folder).
2. Start the frontend development server: `npm run dev` (from the `client` folder).

[Live Link](https://to-do-task11.vercel.app) : https://to-do-task11.vercel.app
