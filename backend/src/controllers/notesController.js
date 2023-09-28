import Note from "../database/noteModel.js";
import FileBucket from "../database/fileBucket.js";
import * as Multipart from "../utils/multipart.js"
import * as mongoose from "mongoose";

/** @type {import("express").RequestHandler} */
export const getNotes = async (req, res) => {
  try { 
    let sort = {}
    let desc = req.query["desc"] ?? true
    sort[req.query["sort"] ?? "createdDatetime"] = desc == true ? -1 : 1
    let options = {
      limit: req.query["limit"],
      skip: (req.query["limit"] ?? 0) * (req.query["page"]-1) ?? 0,
      sort: sort
    }
    
    let filter = null
    if(req.query["tags"] !== undefined){
      filter = {tags: {
        $all: req.query["tags"]
      }}
    }
    const notes = await Note.find(filter,null,options);
    res.status(200).json(notes);
  } catch(err){
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const createNote = async (req, res) => {
  try {
    const boundary = Multipart.getBoundary(req.headers["content-type"])
    const dataParts = Multipart.parse(req.body, boundary)

    const body = JSON.parse(dataParts[0].file.toString())

    let note = {
      name: body.name,
      description: body.description ?? "",
      tags: body.tags ?? [],
      attachments: [],
      view: 0,
      createdDatetime: Date.now(),
      updatedDatetime: Date.now()
    }

    const files = dataParts.slice(1)
    for(let file of files){
      let uploadStream = FileBucket.openUploadStream(file.fileName);
      let fileID = uploadStream.id;
      uploadStream.write(file.file)
      uploadStream.end()
      note.attachments.push(fileID)
    }

    const newNote = new Note(note);
    await newNote.save();
    res.status(200).json({ message: "OK" , id: newNote._id.toString("hex")});
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const getNote = async (req, res) => {
  try{ 
    let filter = {"_id": new mongoose.Types.ObjectId(req.params.id)}
    let note = await Note.findOne(filter)
    await Note.updateOne(
      { _id: note._id },
      { $inc: { view: 1 } }
    )
    res.status(200).json(note); 
  } catch(err){
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const editNote = async (req, res) => {
  try {
    const id = req.params.id
    const body = JSON.parse(req.body)

    let update = { "$set": { updatedDatetime: Date.now()} }
    if(body.name !== null){
      update["$set"].name = body.name
    }
    if(body.description !== null){
      update["$set"].description = body.description
    }
    if(body.tags !== null){
      update["$set"].tags = body.tags
    }

    const updated = await Note.findByIdAndUpdate(id, update)

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const deleteNote = async (req, res) => {
  try{ 
    let filter = {"_id": new mongoose.Types.ObjectId(req.params.id)}
    const note = await Note.findOne(filter);
    if (note != null){
      for(let fileID of note.attachments){
        try{
          await FileBucket.delete(fileID)
        }
        catch(err){
          console.log(err)
        }
      }
      await Note.deleteOne(filter)
    }
    res.status(200).json({ message: "OK" }); 
  } catch(err){
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
