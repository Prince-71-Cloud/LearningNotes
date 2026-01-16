let notes = [];
function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  notes.unshift({
    id: generateId(),
    title: title,
    content: content,
    date: new Date(),
  });

  saveNotes();
  renderNotes();
}
function generateId() {
  return Date.now().toString();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    notesContainer.innerHTML = `
        <div class = "empty-state">
        <h2>No Notes Yet</h2>
        <p>Create your first note.....!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Learning's</button>
        </div>
        `;
    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
        <div class="note-card">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <span class="note-date">${new Date(
              note.date
            ).toLocaleString()}</span>
            <div class="note-actions">
            <button class="edit-btn" onclick="openNoteDialog('${
              note.id
            }')" title="Edit Note">

            </button>
            </div>
        </div>
    `
    )
    .join("");
}

function openNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  dialog.close();
}
document.addEventListener("DOMContentLoaded", () => {
  notes = loadNotes();
  renderNotes();
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
