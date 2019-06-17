import { Schema, model } from 'mongoose';
import _ from 'lodash';

const ReminderNotificationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  sent: Boolean,
  dateTime: Date,
  studentGroup: { type: Schema.Types.ObjectId, ref: 'StudentGroupModel' }
});

export default model('ReminderNotificationModel', ReminderNotificationSchema);
