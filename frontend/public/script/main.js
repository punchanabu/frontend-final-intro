import { about } from "./render/about.js";
import { notelist } from "./render/notelist.js";
import { renderUploadPage } from "./render/upload.js";
import { renderViewNote } from "./render/view.js"
// client side rendering 
// render about page

function renderPage() {
  if (window.location.hash === '#about') {
    about();
  } else if (window.location.hash === '#note-list') {
    notelist();
  } else if (window.location.hash === '#upload') {
    renderUploadPage();
  } else if (window.location.hash.startsWith('#note-view:')) {
    console.log(window.location.hash)
    const id = window.location.hash.split(':')[1];
    renderViewNote(id);
  } else {
    about();
  }
}

// Call renderPage on hashchange
window.addEventListener('hashchange', renderPage);

// Call renderPage on DOMContentLoaded
window.addEventListener('DOMContentLoaded', renderPage);
