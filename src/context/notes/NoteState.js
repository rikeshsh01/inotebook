import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState(props) {
  const host = "http://127.0.0.1:5000";

  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  // Get All Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    // let updatedNote = JSON.parse(JSON.stringify(notes));
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }


  // Add Notes 
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    // console.log(response, "Add Note");

    const json = await response.json();
    // console.log(json.saveNote,"JSON")
    setNotes(notes.concat(json.saveNote))
    // setNotes(notes => [...notes,json.saveNote])
  }



  // Delete Notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}/`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const json = await response.json();

    // console.log(json)
    // console.log(id, " Deleted");
    const noteToBeDeleted = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(noteToBeDeleted);
  }




  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    // console.log(response,"Update Note")
    const json = await response.json();
    // console.log(json)
    // Logic to edit in client

    let updatedNote = JSON.parse(JSON.stringify(notes));

    // console.log(updatedNote, "Update")
    for (let index = 0; index < updatedNote.length; index++) {
      const element = updatedNote[index];
      if (element._id === id) {
        updatedNote[index].title = title;
        updatedNote[index].description = description;
        updatedNote[index].tag = tag;
        break;
      }
    }
    // console.log(id, updatedNote)
    setNotes(updatedNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
