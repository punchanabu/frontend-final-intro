const backend_uri = 'http://localhost:3222';

// fetching all note
export async function fetchNotes() {
    try {
        
        const response = await fetch(backend_uri + '/notes/')
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        
    } catch(error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

// fetching the note by id
export async function fetchNoteById(id) {
    try {
        const response = await fetch(backend_uri + '/notes/' + id + '/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        
    } catch(error) {
        console.error(`Error fetching notes with id${id}`, error);
        throw error;
    }
}

// posting new note
export async function postNote(formData) {
    try {
        const response = await fetch(backend_uri + '/notes/', {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch(error) {
        console.error(`Error posting notes`);
        throw error;  
    };
};



