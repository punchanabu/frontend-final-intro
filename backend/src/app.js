import express from "express";
import cors from "cors";
import NotesRoute from "./routes/notesRoute.js";
import FilesRoute from "./routes/filesRoute.js";
import TagsRoute from "./routes/tagsRoute.js";


const app = express();

// body-parser
app.use(express.raw({type: '*/*'}));


// allow request from other origin (Frontend which is at different port) 
app.use(cors());

// use routes
app.use("/notes", NotesRoute); 
app.use("/files", FilesRoute);
app.use("/tags", TagsRoute);

export default app;
