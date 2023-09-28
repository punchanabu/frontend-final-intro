import "../config/db.js"
import mongoose from "mongoose";

const FileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'attachments'
});

export default FileBucket;