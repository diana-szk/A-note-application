
//See the existing notes in Local Storage
const getStoredNotes = function(){

    const notesJSON = localStorage.getItem('notes');

        if(notesJSON !== null){
            return JSON.parse(notesJSON);
        }else{
            return []
        }
}

//Save the note

const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

//Remove a note from Local Storage

const removeNotes = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id;
    })

    if(noteIndex > -1){
        notes.splice(noteIndex, 1);
    }
}

//Create DOM structure for notes
const createNotes = function(note){
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    const deleteElButton = document.createElement('button');

    //Add a remove button for notes
    deleteElButton.textContent = 'x';
    noteEl.appendChild(deleteElButton);
    
    deleteElButton.addEventListener('click', function(){
        removeNotes(note.id);
        saveNotes(notes)
        renderNotes(notes, filter);
    })

    //Setup the note title text
    if (note.title.length > 0){
        textEl.textContent = note.title;
    }else{
        textEl.textContent = "No name"
    }
    textEl.setAttribute('href', `/notes.html#${note.id}`)
    noteEl.appendChild(textEl);

    return noteEl
    
}

//Sort notes

const sortNotes = function (notes, sortBy){
    if( sortBy === 'lastEdited'){
        return notes.sort(function(a, b){
            if ( a.updatedAt > b.updatedAt){
                return -1
            }else if (a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        });
    }else if( sortBy === 'lastCreated'){
        return notes.sort(function(a, b){
            if (a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return notes
    }
}

//Render Notes

const renderNotes = function(notes, filter){
     notes = sortNotes(notes, filter.sortBy);
    const filterNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filter.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = " ";

    filterNotes.forEach(function(note){
       const noteEl = createNotes(note);
        document.querySelector('#notes').appendChild(noteEl);
        
    })
}


//Generate last edited timestamp

const generateLastEdited = function(timestamp){
    return `Last edited ${moment(timestamp).fromNow()}`
}
