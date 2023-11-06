let titles = [];
let descriptions = [];
let trashTitles = [];
let trashDescriptions = [];

function render() {
  document.getElementById('notes-post').classList.remove('notes-trash-post');
  loadNotes();
  let content = document.getElementById('content');
  let notesPost = document.getElementById('notes-post');
  notesPost.innerHTML = '';
  content.innerHTML = `
  <div id="input-selection" class="input-selection">
   <div class="input-notepad">
     <input onclick="showInput()" id="title-input" class="title-inpute" type="text" max="10" placeholder="Titel" />
     <input id="text-inpute" class="text-inpute d-none-text-inpute" type="text" max="100"
      placeholder="Notiz schreiben..." />
     <a onclick="addNotes()" href="#" id="button-save" class="button-save d-none-button-save">Speichern</a>
   </div>
  </div>`;

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const description = descriptions[i];
    if (title && description) {
      notesPost.innerHTML += `
        <div class="notepad">
        <h1 class="notepad-title"> ${title}</h1>
        <p class="notepad-descriptions">${description}</p>
        <a href="#" onclick="deleteNotes(${i})"><img class="notepad-trash-icon" src="./img/trash.png" alt="trash"></a>
        </div>
    `;
    }
  }
}

function addNotes() {
  let title = document.getElementById('title-input');
  let description = document.getElementById('text-inpute');
  if (title.value && description.value) {
    titles.push(title.value,);
    descriptions.push(description.value);
    document.getElementById('text-inpute').classList.add('d-none-text-inpute');
    document.getElementById('button-save').classList.add('d-none-button-save');
    saveNotes();
    render();
  } else {
    alert('Bitte alle Eingabefelder ausfüllen')
  };
}

function saveNotes() {
  let titlesAtText = JSON.stringify(titles);
  let descriptionsAtText = JSON.stringify(descriptions);
  localStorage.setItem('titles', titlesAtText);
  localStorage.setItem('descriptions', descriptionsAtText);
}

function loadNotes() {
  let titlesAtText = localStorage.getItem('titles');
  let descriptionsAtText = localStorage.getItem('descriptions');
  if (titlesAtText && descriptionsAtText) {
    titles = JSON.parse(titlesAtText);
    descriptions = JSON.parse(descriptionsAtText);
  }
}

function deleteNotes(i) {
  let deletedNoteTitle = titles.splice(i, 1)[0];
  let deletedDescriptions = descriptions.splice(i, 1)[0];
  trashTitles.push(deletedNoteTitle);
  trashDescriptions.push(deletedDescriptions);
  saveTrash();
  saveNotes();
  render();
}

function saveTrash() {
  let trashTitlesAtText = JSON.stringify(trashTitles);
  let trashDescriptionsAtText = JSON.stringify(trashDescriptions);
  localStorage.setItem('trash-titles', trashTitlesAtText);
  localStorage.setItem('trash-descriptions', trashDescriptionsAtText);
}

function loadtrashNotes() {
  const titlesAtText = localStorage.getItem('trash-titles');
  const descriptionsAtText = localStorage.getItem('trash-descriptions');
  if (titlesAtText && descriptionsAtText) {
    trashTitles = JSON.parse(titlesAtText);
    trashDescriptions = JSON.parse(descriptionsAtText);
  }
}

function showTrash() {
  document.getElementById('notes-post').classList.add('notes-trash-post');
  loadtrashNotes();
  let content = document.getElementById('content');
  let notesPost = document.getElementById('notes-post');
  content.innerHTML = '';
  notesPost.innerHTML = '';
  for (let i = 0; i < trashTitles.length; i++) {
    const trashTitle = trashTitles[i];
    const trashDescription = trashDescriptions[i];
    if (trashTitle && trashDescriptions) {
      notesPost.innerHTML += `
        <div class="notepad notepad-trash">
        <h1 class="notepad-title"> ${trashTitle}</h1>
        <p class="notepad-descriptions">${trashDescription}</p>
        <a href="#" onclick="restoreNotes(${i})"><img class="restore-icon" src="./img/arrow.png" alt="removefromtrash"></a>
        <a href="#" onclick="deleteTrashNotes(${i})"><img class="notepad-trash-icon" src="./img/trash.png" alt="trash"></a>
        </div>
    `;
    }
  }
}

function restoreNotes(i) {
  let deletedTrashTitl = trashTitles.splice(i, 1)[0];
  let deletedTrashDescription = trashDescriptions.splice(i, 1)[0];
  titles.push(deletedTrashTitl);
  descriptions.push(deletedTrashDescription);
  saveTrash();
  saveNotes();
  showTrash();
}

function deleteTrashNotes(i) {
  trashTitles.splice(i, 1);
  trashDescriptions.splice(i, 1);
  saveTrash();
  showTrash();
}


function showInput() {
  document.getElementById('text-inpute').classList.remove('d-none-text-inpute');
  document.getElementById('button-save').classList.remove('d-none-button-save');
}


