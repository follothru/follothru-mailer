import configMailer from "./configs/configMailer";
import Email from 'email-templates';
import path from 'path';
import { emailAccountUsername, fetchInterval } from "./configs/config";
import { getNotifications, updateNotificationStatuses } from "./services/Reminder/ReminderService";
import { createLogger } from "./utils/loggers";
import _ from 'lodash';

const emailRoot = path.join(__dirname, 'resources/emails');

const transport = configMailer();

const logger = createLogger('FolloThruMailer.js');

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
        logger.error(`Failed to send email to '${email}'`, error);
        resolve({ success: false, student, error });
      });
  }));

  return Promise.all(promises);
}

const sendNotification = notification =>
  sendEmailsToStudentGroup(notification.studentGroup, 'follothru', notification.meta)
    .then(results => {
      const successes = _.filter(results, result => result.success);
      logger.info(`(success: ${successes.length}/${results.length}) send notification(${notification._id}) completed.`);
    })
    .then(() => notification);

const handleUpdateNotificationResponse = res => {
  if (res && res.nModified > 0) {
    logger.info('Reminder notification statuses updated.', res);
  }
  return res;
}

export default class FolloThruMailer {
  sendNotifications() {
    getNotifications().then(notifications => {
      const sentPromises = _.map(notifications, sendNotification);

      return Promise.all(sentPromises)
        .then(notifications => updateNotificationStatuses(notifications)
          .then(handleUpdateNotificationResponse))
        .then(() => sentPromises)
        .catch(err => {
          logger.error('Failed to update notification statuses.', err);
        });
    })
      .then(sents => logger.info(`Update completed. ${sents.length} notification(s) processed.`))
      .catch(err => {
        logger.error('Failed to fetch reminder notifications.', err);
      });
  }

  start() {
    this.sendNotifications();
    setInterval(() => {
      this.sendNotifications();
    }, fetchInterval);
  }
}
