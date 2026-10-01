
# Village Grievance System (VGS)

A full-stack web application that helps village residents submit complaints, track their status, and access grievance-related services through a simple web interface.

## Features

- **Home Page:** View the main page and available grievance categories.
- **Submit Complaints:** Submit complaints about water problems, street lights, roads, garbage, drainage, and electricity.
- **Track Complaints:** Check complaint details and current status using a complaint ID.
- **User Registration:** Create an account with a name, email, and password.
- **User Login:** Log in using registered credentials.
- **User Dashboard:** Access complaint-related actions and view profile details.
- **Database Integration:** Store complaints and user records in MySQL.

## Technologies Used

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MySQL
- bcrypt
- dotenv

## Project Structure

```text
VGS/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- MySQL Server
- Visual Studio Code (recommended)

## Database Setup

1. Start MySQL Server.
2. Open MySQL Workbench.
3. Create the database:

```sql
CREATE DATABASE vgs;
USE vgs;
```

4. Create the `complaints` and `users` tables using the schemas configured for your project.

## Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `backend/.env` file containing your local database password:

```env
DB_PASSWORD=your_local_mysql_password
```

Replace the example value with your own MySQL password. Never publish this file.

Start the backend:

```bash
node server.js
```

The backend runs at:

`http://localhost:5000`

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## Application Workflow

1. Open the application in your browser.
2. Register a user account.
3. Log in and access the dashboard.
4. Submit a grievance or track an existing complaint.
5. View complaint information stored in the MySQL database.

## Security Notes

- Keep database credentials in environment variables.
- Never commit `.env` files or passwords to GitHub.
- Use appropriate authentication, authorization, and session management before deploying the application for real users.

## Future Enhancements

- Admin dashboard for viewing and managing complaints.
- Complaint status updates by authorized administrators.
- Complaint history for individual users.
- Deployment to a cloud hosting platform.
- Notifications when complaint statuses change.

## Project Purpose

The Village Grievance System aims to make grievance submission and tracking more accessible to village residents through a digital platform.