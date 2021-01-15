'use strict';

let notes = getStoredNotes();

const filter = {
    searchText: "",
    sortBy: 'lastEdited'
}

renderNotes(notes, filter);

document.querySelector('#new-note').addEventListener('click', function(e){
    const id=uuidv4()
    const timestamp = moment().valueOf()
    //Create new array
   notes.push({
       id: id,
       title: "",
       body: "",
       createdAt: timestamp,
       updatedAt: timestamp
   })
   getStoredNotes(notes)
   location.assign(`/notes.html#${id}`);

   //Save the new array in Local Storage and convert to string
   localStorage.setItem('notes', JSON.stringify(notes))
//    renderNotes(notes, filter)

})

document.querySelector('#search-input').addEventListener('input', function(e){
    filter.searchText = e.target.value;
    renderNotes(notes, filter)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
    filter.sortBy = e.target.value;
    renderNotes(notes, filter);
})


//Sync data
window.addEventListener('storage', function(e){
    if (e.key === "notes"){
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filter);
    }
})
