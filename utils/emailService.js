const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email service is ready to send messages');
  }
});

const sendReminderEmail = async (userEmail, subscriptionName, renewalDate, daysUntil) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Subscription Reminder: ${subscriptionName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">SubTrack Reminder</h2>
          <p>Your subscription to <strong>${subscriptionName}</strong> is due for renewal in ${daysUntil} day(s).</p>
          <p><strong>Renewal Date:</strong> ${renewalDate.toDateString()}</p>
          <p><strong>Amount:</strong> Please check your subscription details for pricing information.</p>
          <p>Don't forget to review your subscription and make any necessary changes.</p>
          <div style="margin: 20px 0; text-align: center;">
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Dashboard
            </a>
          </div>
          <div style="margin-top: 20px; padding: 10px; background-color: #F3F4F6; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #6B7280;">
              This is an automated reminder from SubTrack. You can manage your notifications in your settings.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${userEmail} for ${subscriptionName}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendWelcomeEmail = async (userEmail, firstName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to SubTrack!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Welcome to SubTrack, ${firstName}!</h2>
          <p>Thank you for joining SubTrack. We're excited to help you manage your subscriptions more effectively.</p>
          <h3>Getting Started:</h3>
          <ul>
            <li>Add your first subscription from the dashboard</li>
            <li>Set up email reminders in your settings</li>
            <li>Track your monthly and yearly expenses</li>
            <li>Never miss a renewal date again!</li>
          </ul>
          <div style="margin: 20px 0; text-align: center;">
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Get Started
            </a>
          </div>
          <div style="margin-top: 20px; padding: 10px; background-color: #F3F4F6; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #6B7280;">
              If you have any questions, feel free to reach out to our support team.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset Request - SubTrack',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Password Reset Request</h2>
          <p>You requested a password reset for your SubTrack account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="margin: 20px 0; text-align: center;">
            <a href="${resetUrl}" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #3B82F6;">${resetUrl}</p>
          <p><strong>This link will expire in 10 minutes.</strong></p>
          <div style="margin-top: 20px; padding: 10px; background-color: #F3F4F6; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #6B7280;">
              If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

module.exports = { sendReminderEmail, sendWelcomeEmail, sendPasswordResetEmail };

