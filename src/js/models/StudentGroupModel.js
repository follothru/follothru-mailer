import { Schema, model } from "mongoose";

const StudentGroupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'StudentModel' }]
});

export default model('StudentGroupModel', StudentGroupSchema);
