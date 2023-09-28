import "../config/db.js"
import mongoose from "mongoose";

/** @type {import("express").RequestHandler} */
export const getTags = async (req, res) => {
  try { 
    const tags = await mongoose.connection.db.collection("notes").distinct("tags", { "tags" : { $ne : null } } )
    res.status(200).json(tags);
  } catch(err){
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};