// import fetching method
import { fetchNotes, fetchNoteById } from "../api.js";
// function 
import { renderNote } from "./note.js";
//create note
import { handleSubmit } from "../createNote.js";
function renderAboutPage() {
    document.getElementById("app").innerHTML = 
    `
    <section class = "section-1">
        <div class = "paragraph">
            <h1> ค้นพบบันทึก<br>บทเรียนที่ดีที่สุด</h1>
            <p>แพลตฟอร์มแชร์โน้ตที่ดีที่สุด</p>
            <button id = "upload-button-1">เพิ่มโน้ต</button>
        </div>
        <img src="../assets/stacked book.png">
    </section>
    <section class = "section-2" >
        <img src="../assets/graduate.png">
        <div class = "paragraph">
            <h1>ทวนบทเรียน<br>จากโน้ตของเพื่อน </h1>
            <p>เรียนรู้บทเรียนแบบกระชับ หัวข้อที่สำคัญๆประหยัดเวลาในการอ่านเอง</p>
            <button id = "list-button">ดูโน้ตสรุป</button>
        </div>
    </section>
    <section class = "section-1">
        <div class = "paragraph">
            <h1>เเชร์โน้ตของตัวเอง</h1>
            <p>เผยเเพร่โน้ตที่ตัวเองที่ได้บันทึกให้กับเพื่อนๆ<br>หรือผู้คนที่สนใจในวิชานั้นๆ ได้อย่างเสรี</p>
            <button id = "upload-button-2">เพิ่มโน้ต</button>
        </div>
        <img src="../assets/notebook.png">
    </section>
    <section>
        <div class="examnote">
            <h1>ตัวอย่างโน้ต</h1>
        </div>
        <div class="flexbox">
            <div class="item">
                <img src="../assets/2.png" class="center">
                <div class="content">
                    <h4>RICK ASTLEY</h4> 
                </div>
                <div class = "content1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis urna in velit condimentum consectetur. Ut ac dictum libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi justo augue, lobortis a dolor et, fermentum ultrices nunc. Vestibulum molestie ipsum augue, at suscipit justo bibendum eleifend. </div>
            </div>
            <div class="item"> 
                <img src="../assets/3.png" class="center">
                <div class="content">
                    <h4>PRAYUT J</h4> 
                </div>
                <div class = "content1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis urna in velit condimentum consectetur. Ut ac dictum libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi justo augue, lobortis a dolor et, fermentum ultrices nunc. Vestibulum molestie ipsum augue, at suscipit justo bibendum eleifend. </div>
            </div>
            <div class="item"> 
                <img src="../assets/1.png" class="center">
                <div class="content">
                    <h4>OLIVIA COLE</h4> 
                </div>
                <div class = "content1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis urna in velit condimentum consectetur. Ut ac dictum libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi justo augue, lobortis a dolor et, fermentum ultrices nunc. Vestibulum molestie ipsum augue, at suscipit justo bibendum eleifend. </div>
            </div>
        </div>
    </section>
    `;
    document.getElementById("upload-button-1").addEventListener('click', () =>  {
        window.location.hash = 'upload';
    });
    document.getElementById("upload-button-2").addEventListener('click', () =>  {
        window.location.hash = 'upload';
    });
    document.getElementById("list-button").addEventListener('click', () => {
        window.location.hash = 'note-list';
    });
    
}

// render note-list page
function renderNoteList() {
    document.getElementById('app').innerHTML = 
    `
    <div style = "display: flex; justify-content: flex-end;">
        <input id = "search" placeholder=" ค้นหาสมุดโน็ต" />
    </div>
    <section id = "note-list"></section>
    `;  
    // Attach JavaScript event listener to the input element
    var script = document.createElement('script');
    script.src = '../script/render/note.js';
    script.type = 'module';
    script.onload = async function() {
        const data = await fetchNotes();
        renderNote(data);
        document.getElementById('search').addEventListener('input', function() {
            renderNote(data, this.value);
        });
    };
    document.head.appendChild(script);
  }
  
// render the upload page
  function renderUploadPage() {
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
    document.getElementById('content-share-note-button').addEventListener("click", handleSubmit);
}
let page_num = 0;
async function renderViewNote(id) {
    const data = await fetchNoteById(id);
    const imgUri = `http://localhost:3222/files/${data.attachments[page_num]}`
    const dateCreate = data.createdDatetime.split('T')[0];
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
            <div class = "tag-container"></div>
            <p>${data.description}</p>
            <div class = "view-container">
                <img src = "../assets/view.png"/>
                <h2>${data.view}</h2>
            </div>
            <p class = "date-create">created on: ${dateCreate}</h2>
            <div class = prev-next-container>
                <button id = "prev">previus page</button>
                <button id = "next">next page</button>
            </div>
        </section>
    </div>
    `
    const updateImage = () => {
        const imgElement = document.querySelector('.note-container img');
        imgElement.src = `http://localhost:3222/files/${data.attachments[page_num]}`;
    };
    const prevButton = document.getElementById("prev");
    prevButton.addEventListener('click', function () {
        if(!page_num) return 0;
        page_num--;
        updateImage();
    })
    
    const nextButton = document.getElementById("next")
    nextButton.addEventListener('click', function() {
        console.log(page_num);
        if (page_num >= data.attachments.length - 1) {
            return 0;
        }
        page_num++;
        updateImage();
    })

}

export {renderAboutPage,renderNoteList,renderUploadPage,renderViewNote};