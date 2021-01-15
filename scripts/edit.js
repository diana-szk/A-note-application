const noteTitle  = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeNote = document.querySelector('#remove-note')
const dateNote = document.querySelector('#last-edited')

//Getting de id by the note the user is trying to edit
const noteId = location.hash.substring(1);
let notes = getStoredNotes()
let note = notes.find(function (note){
    return note.id === noteId
})

if(note === undefined){
    location.assign('/index.html')
}

//Populating the notes with values
noteTitle.value = note.title;
noteBody.value = note.body;
dateNote.textContent = generateLastEdited(note.updatedAt);

//Set the input event for title
noteTitle.addEventListener('input', function(e){
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    dateNote.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
})

//Set the input event for the body
noteBody.addEventListener('input', function(e){
    note.body = e.target.value;
    note.updatedAt = moment().valueOf()
    dateNote.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
})

//Set the input event for the remove button
removeNote.addEventListener('click', function(e){
    removeNotes(note.id);
    saveNotes(notes);
    location.assign('/index.html')
})

//Change the behaviour on all pages
window.addEventListener('storage', function(e){
    if (e.key === 'notes')
    notes = JSON.parse(e.newValue);
    note = notes.find(function (note){
        return note.id === noteId
    })
    
    if(note === undefined){
        location.assign('/index.html')
    }
    
    //Populating the notes with values
    noteTitle.value = note.title;
    noteBody.value = note.body;  
    dateNote.textContent = generateLastEdited(note.updatedAt);  
})