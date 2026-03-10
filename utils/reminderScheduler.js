const cron = require('node-cron');
const { sendReminderEmail } = require('./emailService');
const SubscriptionModel = require('../models/Subscription');
const UserModel = require('../models/User');

// Run every morning at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily reminder email check...');

   try {
    const users = await UserModel.find({
      "settings.emailNotifications": true
    });

    for (const user of users) {
      const subscriptions = await SubscriptionModel.find({
        userId: user._id
      });

      for (const subscription of subscriptions) {
        const today = new Date();
        const renewalDate = new Date(subscription.renewalDate);
        const timeDiff = renewalDate - today;
        const daysUntilRenewal = Math.ceil(
          timeDiff / (1000 * 60 * 60 * 24)
        );

        if (
          daysUntilRenewal <= user.settings.reminderDays &&
          daysUntilRenewal > 0
        ) {
          await sendReminderEmail(
            user.email,
            subscription.name,
            renewalDate,
            daysUntilRenewal
          );

          console.log(
            `Reminder sent to ${user.email} for ${subscription.name}`
          );
        }
      }
    }

    console.log('Cron job finished successfully - - runs daily at 9:00 AM');
  } catch (error) {
    console.error('Cron job error:', error);
  }
});


// Run every evening at 6:00 PM
cron.schedule('0 18 * * *', async () => {
  console.log('Running daily reminder email check...');

   try {
    const users = await UserModel.find({
      "settings.emailNotifications": true
    });

    for (const user of users) {
      const subscriptions = await SubscriptionModel.find({
        userId: user._id
      });

      for (const subscription of subscriptions) {
        const today = new Date();
        const renewalDate = new Date(subscription.renewalDate);
        const timeDiff = renewalDate - today;
        const daysUntilRenewal = Math.ceil(
          timeDiff / (1000 * 60 * 60 * 24)
        );

        if (
          daysUntilRenewal <= user.settings.reminderDays &&
          daysUntilRenewal > 0
        ) {
          await sendReminderEmail(
            user.email,
            subscription.name,
            renewalDate,
            daysUntilRenewal
          );

          console.log(
            `Reminder sent to ${user.email} for ${subscription.name}`
          );
        }
      }
    }

    console.log('Cron job finished successfully - - runs daily at 6:00 PM');
  } catch (error) {
    console.error('Cron job error:', error);
  }
});




