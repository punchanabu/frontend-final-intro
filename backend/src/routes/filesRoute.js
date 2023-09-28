import express from "express";

import * as filesController from "../controllers/filesController.js";

const router = express.Router();

// Use notes collection as single source of truth.
// read-only, to edit must use Note methods (Note as single source of truth).

// get the file content
//
// endpoint:
//   files/:id
//
// response:
//   (200)
//     Raw data
router.get("/:id", filesController.getFile);

export default router;
