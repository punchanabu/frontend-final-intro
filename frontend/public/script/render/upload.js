import { handleSubmit } from "../createNote.js";

export const renderUploadPage = () => {

    // rendering component
    document.getElementById('app').innerHTML = 
    `
    <div class = content-share-note>
        <input id = "content-share-note-input" placeholder = "name"></input>
        <input id = "content-share-note-description" placeholder = "description"></input>
        <input id = "content-share-note-tag" placeholder = "tag"></input>
        <div id = "content-share-note-button-file">
            <input type="file" id="fileInput" accept="image/*" multiple>
            <button id = "content-share-note-button">Upload Note</button>
        </div>
    </div>
    `;
    
    // handle submit button
    document.getElementById('content-share-note-button').addEventListener("click", handleSubmit);
}