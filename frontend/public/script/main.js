import { renderAboutPage,renderNoteList,renderUploadPage,renderViewNote } from "./render/page.js";
// client side rendering 
// render about page

  window.addEventListener('hashchange', function() {
    if (window.location.hash === '#about') {
      renderAboutPage();
    } else if (window.location.hash === '#note-list') {
    
      renderNoteList();
    } else if (window.location.hash === '#upload') {
      renderUploadPage();
    } else if (window.location.hash.startsWith('#note-view:')) {
        console.log(window.location.hash)
        const id = window.location.hash.split(':')[1];
        renderViewNote(id);
    }
  });