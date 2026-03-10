SubTrack - Subscription Tracking System
SubTrack is a comprehensive web-based subscription management system that helps users track,
manage, and analyze their digital subscriptions in one centralized location.
Features
Authentication & Security
Secure user registration and login with JWT tokens
Password hashing using bcrypt
Protected routes and middleware authentication
Secure logout functionality
Show/Hide password toggle on all password fields
Forgot password functionality with secure email reset links
Password reset system with time-limited tokens (10 minutes)
Subscription Management
Add new subscriptions with detailed information
Edit existing subscription details
Delete/deactivate subscriptions
Categorize subscriptions (Education, Streaming, TV, Entertainment, Music, Others)
Set billing frequency (Monthly/Yearly)
Track renewal dates
Dashboard & Analytics
View all active subscriptions in an organized dashboard
Calculate total monthly and yearly expenses
Visual subscription cards with category icons
Renewal date tracking with urgency indicators
Category-based expense breakdown
User Profile & Settings
Update personal profile information
Customize notification preferences
Set reminder days before renewal
Toggle email notifications
Email Notifications
Automated reminder system using Nodemailer
Automated daily reminder system using node-cron
Welcome emails for new users
Password reset emails with secure links
Configurable reminder timing
HTML-formatted email templates
User preference-based notifications
Background job scheduler for daily checks
UI/UX Enhancements
Dark/Light mode toggle with system preference detection
Persistent theme settings stored in localStorage
Show/Hide password functionality on all password inputs
Responsive design for mobile, tablet, and desktop
Smooth transitions and hover effects
Professional styling with Tailwind CSS
Tech Stack
Backend
Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database with Mongoose ODM
JWT - Authentication tokens
bcrypt - Password hashing
crypto - Secure token generation for password resets
Nodemailer - Email service
node-cron - Task scheduling for email reminders
CORS - Cross-origin resource sharing
dotenv - Environment variables
Frontend
HTML5 - Markup language
Tailwind CSS - Utility-first CSS framework (CDN) with dark mode support
Vanilla JavaScript - Client-side interactivity
Font Awesome - Icons library
Prerequisites
Node.js (v20.19.6)
MongoDB (atlas - cloud instance)
Gmail account (for email notifications)
Set up environment variables**
Update the .env file with your configuration:
PORT=3000
MONGODB_URI=url/database_collection_name
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
APP_URL=http://localhost:3000
Start the application
npm run start
Access the application
Open your browser and navigate to http://localhost:3000
API Endpoints
Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/forgot-password - Send password reset email
POST /api/auth/reset-password - Reset password with token
User Management
GET /api/user/profile - Get user profile
PUT /api/user/profile - Update user profile
PUT /api/user/settings - Update user settings
Subscription Management
GET /api/subscriptions - Get all user subscriptions
POST /api/subscriptions - Create new subscription
PUT /api/subscriptions/:id - Update subscription
DELETE /api/subscriptions/:id - Delete subscription
GET /api/subscriptions/analytics - Get spending analytics
Security Features
Password hashing with bcrypt (10 salt rounds)
JWT token-based authentication
Secure password reset with crypto-generated tokens
Time-limited reset tokens (10 minutes expiration)
Hashed token storage using SHA256
Input validation
Protected API routes with middleware
Input validation and sanitization
CORS configuration for cross-origin requests
Environment variable protection
Email Reminder System
The system includes a comprehensive email notification system:
1. Daily Scheduler: Runs every day at 9:00 AM and 6:00 PM to check for upcoming renewals
2. User Preferences: Respects individual user settings for notification timing
3. Welcome Emails: Automatically sent to new users upon registration
4. Immediate Alerts: Sent when adding subscriptions that are due soon
5. Password Reset Emails: Secure reset links with time-limited tokens
Email Types:
Welcome emails for new registrations
Renewal reminders based on user preferences (1, 3, 7, or 14 days before)
Password reset emails with secure links
SubTrack - Take control of your subscription spending!
© 2026 SubTrack· Project Owner: Neelam Gupta
