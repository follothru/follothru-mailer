import ReminderNotificationModel from "../../models/ReminderNotificationModel";
import StudentGroupModel from "../../models/StudentGroupModel";
import StudentModel from "../../models/StudentModel";
import _ from 'lodash';

export function getNotifications() {
  return ReminderNotificationModel.find({ sent: false, dateTime: { $lte: new Date() } })
    .populate({
      path: 'studentGroup',
      model: 'StudentGroupModel',
      populate: {
        path: 'students',
        model: 'StudentModel'
      }
    });
}

export function updateNotificationStatuses(notifications, sent = true) {
  if (!notifications || notifications.length <= 0) {
    return Promise.resolve();
  }
  const ids = _.map(notifications, notification => notification._id);
  return ReminderNotificationModel.updateMany({ _id: { $in: ids } }, { $set: { sent } });
}
