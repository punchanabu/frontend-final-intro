import express from "express";

import * as tagsController from "../controllers/tagsController.js";

const router = express.Router();

// Use notes collection as single source of truth.
// read-only, to edit must use Note methods.

// get list of all distinct tags on all notes
//
// endpoint:
//   tags/
//
// response:
//   (200)
//     JSON formated String[]
router.get("/", tagsController.getTags);

export default router;