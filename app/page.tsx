"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";


export default function Home() {
type Pad = {
  id: string;
};

type Note = {
  id: string;
  text: string;
  padId: string;
  isEditing: boolean;
};

  const [notes, setNotes] = useState<Note>([]);
  const [pads, setPads] = useState<Pad[]>([]);
  const [inputText,setInputText] = useState("");
  const addNote = () => {
    if (!inputText.trim()) return;
    
    const padId = Date.now().toString();

    setPads([
      ...pads,
      { id: padId }
    ]);

    setNotes([
      ...notes,
      {
        id: padId +"-note",
        text: inputText,
        padId,
        isEditing: false
      }
    ]);
    
    setInputText("")
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id)) 
    
  }
  
  const startEditing = (id) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note, isEditing: true} : note));
  }

  const handleEditChange = (id, newText) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id && note.isEditing ? {...note, text:newText} : note));
  }

  const saveEdit = (id) =>{
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note, isEditing: false} : note));
  }  
  return (
    <>
      <header className="header">
        <div className="main-bar">
        <h1 className="title">Notes</h1>
        <button type="button" onClick={addNote} className="add__button">
          <FontAwesomeIcon icon={faSquarePlus} />
        </button>
        </div>
        <div className="create-pad">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="note__input add-note"
            />
        </div>
      </header>
      <main className="page">
        <div className="pad-container">
          {notes.map((note) => (
            <div key={note.id} className="pads">
            <div  className="note-pad">
            <div className="button__holder">
              {note.isEditing ? (
                <button type="button" onClick={() => saveEdit(note.id)} className="save__button">
                  <FontAwesomeIcon icon={faCircleDown} />
                </button>
              ) : (
                <button type="button" onClick={() => startEditing(note.id)} className="edit__button">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              )}
                <button type="button" onClick={() => deleteNote(note.id)} className="delete__button">
                  <FontAwesomeIcon icon={faDeleteLeft} />
                  </button>
            </div>
                  <textarea
                    value={note.text}
                    ref={(el) => {
                      if (!el) return;
                      el.style.height = "auto";
                      el.style.height = el.scrollHeight + "px";
                    }}
                    onChange={(e) => {
                      handleEditChange(note.id, e.target.value);
                      const el = e.target;
                      el.style.height = "auto";
                      el.style.height = el.scrollHeight + "px";
                    }}
                    className={`note__input ${note.isEditing ? "editing" : "readonly"}`}
                  />
            </div>
        </div>
      ))}       
        </div>
      </main>
    </>
  );
};