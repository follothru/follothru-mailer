import configMailer from "./configs/configMailer";
import Email from 'email-templates';
import path from 'path';
import { emailAccountUsername, fetchInterval } from "./configs/config";
import { getNotifications, updateNotificationStatuses } from "./services/Reminder/ReminderService";
import _ from 'lodash';

const transport = configMailer();

const emailRoot = path.join(__dirname, 'resources/emails');

function sendEmail(to, template, locals) {
  const email = new Email({
    views: { root: emailRoot },
    message: {
      from: emailAccountUsername
    },
    transport
  });

  return email.send({
    template,
    message: {
      to
    },
    locals
  });
}

function sendEmailsToStudentGroup(studentGroup, template, locals = {}) {
  const { students } = studentGroup;
  const promises = _.map(students, student => new Promise(resolve => {
    const { preferName, email } = student;
    locals.recipient = preferName;
    sendEmail(email, template, locals)
      .then(() => resolve({ success: true, student }))
      .catch(error => {
        console.error(`Failed to send email to ${email}`, error);
        resolve({ success: false, student, error });
      });
  }));

  return Promise.all(promises);
}

const handleUpdateNotificationResponse = res => {
  if (res && res.nModified > 0) {
    console.log('Reminder notification statuses updated.', res);
  }
  return res;
}

export default class FolloThruMailer {
  sendNotifications() {
    getNotifications().then(notifications => {
      const sentPromises = _.map(notifications, notification =>
        sendEmailsToStudentGroup(notification.studentGroup, 'follothru')
          .then(() => console.log(`Email sent. notification id: ${notification._id}`))
          .then(() => notification)
      );

      Promise.all(sentPromises)
        .then(notifications => updateNotificationStatuses(notifications)
          .then(handleUpdateNotificationResponse))
        .catch(err => {
          console.error('Failed to update notification statuses.', err);
        });
    })
      .catch(err => {
        console.error('Failed to fetch reminder notifications.', err);
      });
  }

  start() {
    this.sendNotifications();
    setInterval(() => {
      this.sendNotifications();
    }, fetchInterval);
  }
}
