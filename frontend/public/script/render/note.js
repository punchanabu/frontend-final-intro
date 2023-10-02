export const renderNote = (datas,query = 0) => {

    const note_list = document.getElementById("note-list");

    // for clearing all notes every render
    clear(note_list);

    // for filtering all notes every render for searching notes
    datas = filter(datas,query);

    // for appending all notes every render
    appendNote(datas,note_list);
    
};

const appendNote = (datas,list) => {
    for (const data of datas) {
        const note = document.createElement("div");
        note.className = "box";
        note.innerHTML = 
        `   
            <img src = 'http://localhost:3222/files/${data.attachments[0]}'/>
            <h1>${data.name}</h1>
            <div class = "view">
                <img src = "../assets/1.png"/>
                <img src = "../assets/view.png" id = "view-icon"/>
                <p>${data.view}</p>
            </div>
        `
        note.addEventListener('click',() => {
            window.location.href = `/#note-view:${data._id}`
        });
        list.appendChild(note);
    };

}

const filter = (datas,query) => {
    if (query && query != "") {
        datas = datas.filter(data => data.name.toLowerCase().includes(query.toLowerCase()));
    }
    return datas
}

const clear = (list) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

}
