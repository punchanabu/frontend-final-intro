import express from "express";

import * as notesController from "../controllers/notesController.js";

const router = express.Router();

// Get notes
//
// endpoint:
//   notes/
//
// query parameters:
//   tags?: String[]
//   limit?: Number
//   page?: Number
//   sort: Literal["created"|updated"|"view"] = "created"
//   desc: Boolean(0|1) = 0
//
// response:
//   (200)
//     JSON formated Note[]
router.get("/", notesController.getNotes);

// Create a new note
//
// endpoint:
//   notes/
//
// body:
//   multipart/form-data format:
//     first part is the JSON formatted Note.
//       {
//          name: String,
//          description: String,
//          tags: String[]
//       }
//     second to n-part is the attachment files ordered in the same manner.
//
// response:
//   (200)
//     {
//       "message": message,
//       "id": inserted note id
//     }
router.post("/", notesController.createNote);

// Get note
//
// endpoint:
//   notes/:id
//
// response:
//   (200)
//     JSON formated Note
router.get("/:id", notesController.getNote);

// Update note
// > currently does not support attachment edit since, without external library,
//   I don't think we want to write our own JSON patch parser or something similarly.
//
// endpoint:
//   notes/:id
//
// body:
//     JSON formatted Note where its fields denote the data to be replaced.
//       {
//          name: String,
//          description: String,
//          tags: String[]
//       }     
// response:
//   (200)
//     {
//       "message": message
//     }
router.put("/:id", notesController.editNote);

// Delete note
//
// endpoint:
//   notes/:id
//
// response:
//   (200)
//     {
//       "message": message
//     }
router.delete("/:id", notesController.deleteNote);

export default router;