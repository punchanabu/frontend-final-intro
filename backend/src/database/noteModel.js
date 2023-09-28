import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
  tags: {
    type: [String],
    default: [],
    required: true
  },
  attachments: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: true
  },
  view: {
    type: Number,
    default: 0,
    required: true
  },
  createdDatetime: {
    type: Date,
    require: true
  },
  updatedDatetime: {
    type: Date,
    require: true
  }
});

const Note = mongoose.model("Note", noteSchema);
await Note.createIndexes({"tags": 1})
await Note.createIndexes({"view": 1})
await Note.createIndexes({"createdDatetime": 1})
await Note.createIndexes({"updatedDatetime": 1})

export default Note;
