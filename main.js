let data = JSON.parse(localStorage.getItem("notes")) || [];

const showFormBtn = document.querySelector("#showFormBtn");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".form");
const addNoteBtn = document.getElementById("addNoteBtn");
const textarea = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes-container");

const countAll = document.querySelector(".btn-gray span");
const countPending = document.querySelector(".btn-yellow span");
const countDone = document.querySelector(".btn-green span");

showFormBtn.addEventListener("click", () => {
  overlay.classList.add("showOverlay");
  form.style.bottom = "0%";
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("showOverlay");
  form.style.bottom = "-100%";
});

function addNewNote(text) {
  if (text.trim() === "") return;

  const newNote = {
    text: text.trim(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  data.push(newNote);
  localStorage.setItem("notes", JSON.stringify(data));
}

addNoteBtn.addEventListener("click", () => {
  const text = textarea.value;
  addNewNote(text);
  textarea.value = "";
  overlay.classList.remove("showOverlay");
  form.style.bottom = "-100%";
  addNotes(data);
});

function addNotes(notesList) {
  notesContainer.innerHTML = "";

  notesList.forEach((note) => {
    const noteClass = note.status === "done" ? "note change" : "note note-pending";
    const noteHTML = `
      <div class="${noteClass}">
        <p>${note.text}</p>
        <button></button>
        <span>${note.createdAt}</span>
      </div>`;
    notesContainer.innerHTML += noteHTML;
  });

  clickbtn();
  updateCount();
}

function clickbtn() {
  const btns = document.querySelectorAll(".note button");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const noteDiv = btn.parentElement;
      const noteText = noteDiv.querySelector("p").textContent;
      const note = data.find((n) => n.text === noteText);

      if (note) {
        note.status = note.status === "pending" ? "done" : "pending";
        noteDiv.classList.toggle("change"); 
        noteDiv.classList.toggle("note-pending");
      }

      localStorage.setItem("notes", JSON.stringify(data));
      updateCount();
    });
  });
}

function updateCount() {
  countAll.textContent = data.length;
  countPending.textContent = data.filter((n) => n.status === "pending").length;
  countDone.textContent = data.filter((n) => n.status === "done").length;
}


searchInput=document.querySelector('.search_input')
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  if (query === "") {
    addNotes(data); 
  } else {
    const filteredNotes = data.filter(note =>
      note.text.toLowerCase().includes(query)
    );
    addNotes(filteredNotes); 
  }
});

window.addEventListener("DOMContentLoaded", () => {
  addNotes(data);
});




