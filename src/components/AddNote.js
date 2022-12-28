import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    
    const [note,setNote] = useState({title:"",description:"",tag:""});

    const addNoteClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    const onChange =(e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <h3>Add Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNoteClick}>Submit</button>
            </form>


        </div>
    )
}
