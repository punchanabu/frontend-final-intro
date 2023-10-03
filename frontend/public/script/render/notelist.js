import { fetchNotes } from "../api";
import { renderNote } from "./note";

export const notelist = () => {

    // render note list element
    render();
    
    // Attach JavaScript event listener to the input element
    var script = document.createElement('script');
    script.src = '../script/render/note.js';
    script.type = 'module';
    script.onload = async function() {
        load();
    };
    document.head.appendChild(script);
}

const render = () => {
    document.getElementById('app').innerHTML = 
    `
    <div style = "display: flex; justify-content: flex-end;">
        <input id = "search" placeholder=" ค้นหาสมุดโน็ต" />
    </div>
    <section id = "note-list"></section>
    `;  
}

const load = async () => {
    
    // load data
    const data = await fetchNotes();
    renderNote(data);
    
    // reload every search input to implemented a real-time search
    document.getElementById('search').addEventListener('input' ,() => {
        renderNote(data, this.value);;
    })
}
