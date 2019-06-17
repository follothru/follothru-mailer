import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  preferName: String,
  email: String
});

export default model('StudentModel', StudentSchema);
