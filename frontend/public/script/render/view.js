import { fetchNoteById } from "../api.js";

export async function renderViewNote(id) {
    // initialize
    let page_num = 0;
    const data = await fetchNoteById(id);
    const imgUri = `http://localhost:3222/files/${data.attachments[page_num]}`
    const dateCreate = data.createdDatetime.split('T')[0];

    // render the view note component
    render(data,imgUri,dateCreate,page_num);

    // update image
    updateImage(data,page_num);

    // handle previous button
    const prevButton = document.getElementById("prev");
    prevButton.addEventListener('click', function () {
        if(!page_num) return 0;
        page_num--;
        updateImage(data,page_num);
    })
    
    // handle next button
    const nextButton = document.getElementById("next")
    nextButton.addEventListener('click', function() {
        
        if (page_num >= data.attachments.length - 1) {
            return 0;
        }
        page_num++;
        updateImage(data,page_num);
    })

}

// rendering component
const render = (data,imgUri,dateCreate,page_num) => {
    document.getElementById('app').innerHTML = 
    `
    <div class = "content-view-note" >
        <section>
            <div class = note-container >
                <img src = "${imgUri}">
            </div>
        </section>
        <section class = "description-container">
            <h1>${data.name}</h1>
            <div class = "tag-container">${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <p>${data.description}</p>
            <div class = "view-container">
                <img src = "../assets/view.png"/>
                <h2>${data.view}</h2>
            </div>
            <p class = "date-create">created on: ${dateCreate}</h2>
            <div>Page:${page_num + 1}/${data.attachments.length}</div>
            <div class = prev-next-container>
                <button id = "prev">previus page</button>
                <button id = "next">next page</button>
            </div>
        </section>
    </div>
    `
}

// update image
const updateImage = (data,page_num) => {
    const imgElement = document.querySelector('.note-container img');
    imgElement.src = `http://localhost:3222/files/${data.attachments[page_num]}`;
}