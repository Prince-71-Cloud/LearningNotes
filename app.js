let notes = [];
let editingNoteId = null;

function loadNotes() {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (editingNoteId) {
    // Update existing note
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    notes[noteIndex].title = title;
    notes[noteIndex].content = content;
    notes[noteIndex].date = new Date();
    editingNoteId = null;
  } else {
    // Create new note
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
      date: new Date(),
    });
  }
  closeNoteDialog();
  saveNotes();
  renderNotes();
}
function generateId() {
  return Date.now().toString();
}

function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== noteId);
  saveNotes();
  renderNotes();
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
              note.date,
            ).toLocaleString()}</span>
            <div class="note-actions">
            <button class="edit-btn" onclick="openNoteDialog('${
              note.id
            }')" title="Edit Note">
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#191b23"><path d="M184-184v-83.77l497.23-498.77q5.15-5.48 11.07-7.47 5.93-1.99 11.99-1.99 6.06 0 11.62 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 12.25 0 6.13-2.24 12.06-2.24 5.92-7.22 11.07L267.77-184H184Zm505.15-466.46L744-704.54 704.54-744l-54.08 54.85 38.69 38.69Z"/></svg>
            </button>
            <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#191b23"><path d="M291-267.69 267.69-291l189-189-189-189L291-692.31l189 189 189-189L692.31-669l-189 189 189 189L669-267.69l-189-189-189 189Z"/></svg>
            </button>
        </div>
        </div>
    `,
    )
    .join("");
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    // Edit existing note
    const noteToEdit = notes.find((note) => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById("dialogTitle").textContent = "Edit Note";
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
  } else {
    // New note
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add New Note";
    titleInput.value = "";
    contentInput.value = "";
  }

  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  dialog.close();
}
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("themeToggleBtn").textContent = isDark ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", () => {
  notes = loadNotes();
  renderNotes();
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("themeToggleBtn")
    .addEventListener("click", toggleTheme);
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
