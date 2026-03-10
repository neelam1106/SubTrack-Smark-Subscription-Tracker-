
# SubTrack – Subscription Tracking System

**SubTrack** is a comprehensive **web-based subscription management system** that helps users **track, manage, and analyze their digital subscriptions** in one centralized location.

---

# Features

## 1. Authentication & Security

* Secure user **registration and login using JWT tokens**
* **Password hashing with bcrypt**
* **Protected routes** using authentication middleware
* **Secure logout functionality**
* **Show/Hide password toggle** on all password fields
* **Forgot password system** with secure email reset links
* **Password reset with time-limited tokens (10 minutes)**

---

## 2. Subscription Management

* Add new subscriptions with detailed information
* Edit existing subscription details
* Delete or deactivate subscriptions
* Categorize subscriptions:

  * Education
  * Streaming
  * TV
  * Entertainment
  * Music
  * Others
* Set billing frequency (**Monthly / Yearly**)
* Track **renewal dates**

---

## 3. Dashboard & Analytics

* View all active subscriptions in an organized **dashboard**
* Calculate **total monthly and yearly expenses**
* **Visual subscription cards** with category icons
* **Renewal date tracking** with urgency indicators
* **Category-based expense breakdown**

---

## 4. User Profile & Settings

* Update personal profile information
* Customize notification preferences
* Set reminder days before renewal
* Toggle email notifications

---

## 5. Email Notifications

Automated email system built with **Nodemailer and node-cron**.

Features include:

* Automated **daily reminder scheduler**
* **Welcome emails** for new users
* **Password reset emails** with secure links
* **Configurable reminder timing**
* **HTML-formatted email templates**
* **User preference-based notifications**
* **Background job scheduler for daily checks**

---

## 6. UI/UX Enhancements

* **Dark / Light mode toggle** with system preference detection
* Persistent theme settings using **localStorage**
* Show/Hide password functionality
* **Responsive design** for mobile, tablet, and desktop
* Smooth transitions and hover effects
* Professional styling using **Tailwind CSS**

---

# Tech Stack

## Backend

* **Node.js** – Runtime environment
* **Express.js** – Web framework
* **MongoDB** – Database
* **Mongoose** – ODM for MongoDB
* **JWT (JSON Web Token)** – Authentication
* **bcrypt** – Password hashing
* **crypto** – Secure token generation
* **Nodemailer** – Email service
* **node-cron** – Task scheduling for reminders
* **CORS** – Cross-origin resource sharing
* **dotenv** – Environment variable management

---

## Frontend

* **HTML5** – Markup language
* **Tailwind CSS (CDN)** – Utility-first styling framework
* **Vanilla JavaScript** – Client-side functionality
* **Font Awesome** – Icons library

---

# Prerequisites

Before running the project, ensure you have:

* **Node.js (v20.19.6)**
* **MongoDB Atlas (Cloud Database)**
* **Gmail account (for email notifications)**

---

# Environment Variables Setup

Create a **`.env`** file and add the following configuration:

```
PORT=3000
MONGODB_URI=url/database_collection_name
JWT_SECRET=your_super_secret_jwt_key_here

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

APP_URL=http://localhost:3000
```

---

# Start the Application

Install dependencies:

```
npm install
```

Run the application:

```
npm run start
```

---

# Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

# API Endpoints

## Authentication

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – User login
* `POST /api/auth/forgot-password` – Send password reset email
* `POST /api/auth/reset-password` – Reset password using token

---

## User Management

* `GET /api/user/profile` – Get user profile
* `PUT /api/user/profile` – Update profile
* `PUT /api/user/settings` – Update user settings

---

## Subscription Management

* `GET /api/subscriptions` – Get all subscriptions
* `POST /api/subscriptions` – Create new subscription
* `PUT /api/subscriptions/:id` – Update subscription
* `DELETE /api/subscriptions/:id` – Delete subscription
* `GET /api/subscriptions/analytics` – Get spending analytics

---

# Security Features

* Password hashing with **bcrypt (10 salt rounds)**
* **JWT-based authentication**
* **Secure password reset tokens**
* **Token expiration (10 minutes)**
* **SHA256 hashed token storage**
* **Input validation and sanitization**
* **Protected API routes**
* **CORS configuration**
* **Environment variable protection**

---

# Email Reminder System

The system includes a **fully automated email reminder system**.

### Scheduler

Runs every day at:

* **9:00 AM**
* **6:00 PM**

to check for upcoming subscription renewals.

### Email Types

* Welcome emails for new registrations
* Renewal reminders (**1, 3, 7, or 14 days before renewal**)
* Password reset emails with secure links

### Key Features

* User-specific notification preferences
* Automatic renewal alerts
* HTML-formatted email templates

---

# Project Summary

**SubTrack** helps users **take control of their subscription spending** by providing an organized platform to track subscriptions, monitor expenses, and receive timely reminders.

---

© 2026 **SubTrack**
Project Owner: **Neelam Gupta**

