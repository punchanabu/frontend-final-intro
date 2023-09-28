import FileBucket from "../database/fileBucket.js";
import * as mongoose from "mongoose";

/** @type {import("express").RequestHandler} */
export const getFile = async (req, res) => {
  try { 
    FileBucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.id))
                                  .pipe(res)
  } catch(err){
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};