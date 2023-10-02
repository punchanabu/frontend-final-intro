import { postNote } from "./api.js";

export const prepare = (note,files) => {
    
    const formData = new FormData();

    formData.append("note",JSON.stringify(note));

    files.forEach((file,index) => {
        formData.append(`attachment${index + 1}`, file);
    })
    
    
    return formData;
}

export const create = (noteData,fileInputs) => {

    const formData = prepare(noteData,fileInputs);

    postNote(formData); 
}
export const handleSubmit = () => {
    
    const name = document.getElementById('content-share-note-input').value;
    const description = document.getElementById('content-share-note-description').value;
    const tag = document.getElementById('content-share-note-tag').value;

    const noteData = {
        name,
        description,
        tag
    }

    const fileInputs = document.querySelectorAll('input[type=file]');
    const files = Array.from(fileInputs).map(input => input.files[0]).filter(Boolean);

    create(noteData,files)
}