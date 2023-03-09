import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar.js";
import NoteEditor from "./NoteEditor.js";
import { v4 as uuidv4 } from 'uuid';

function Layout() {
  const [note, setNotes] = useState(
    JSON.parse(localStorage.getItem("localNotes")) || []);

  const [currentNote, setCurrentNote] = useState(false);
  
  const getCurrentNote = () => {
    return note.find((note) => note.id === currentNote);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  return formatted;
};

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      preview: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...note]);
  };

  const onDeleteNote = (targetID) => {
    const answer = window.confirm("Are you sure you want to delete this note?");
    if (answer) {
      setNotes(note.filter((note) => note.id !== targetID))
    }
  };

  const onUpdateNote = (editedNote) => {
    const editedNotes = note.map((note) => {
      if (note.id === currentNote) {
        return editedNote;
      }
      return note;
    });

    setNotes(editedNotes);
  };

  const onToggleSidebar = () => {
    const sidebar = document.getElementById("noteMenu");

    sidebar.toggleAttribute("hidden");
  }

    return (
    <>  
      <div className="pageBanner">
        <button id="sidebarToggle" onClick={() => onToggleSidebar()}>&#9776;</button>
        <div>
          <h1>Lotion</h1>
          <small>Like Notion, but worse</small>
        </div>
        <p></p>
      </div>
      <div className="page">
        <Sidebar id ="sidebar" note={note} onAddNote={onAddNote} currentNote={currentNote} setCurrentNote={setCurrentNote} formatDate={formatDate} />
        <NoteEditor onDeleteNote={onDeleteNote} currentNote={getCurrentNote()} formatDate={formatDate} onUpdateNote={onUpdateNote} />
      </div>

      <Outlet />
    </>
    );
}

export default Layout;