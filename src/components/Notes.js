import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'


import AddNote from './AddNote';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    let navigate = useNavigate()
    

    useEffect(() => {
        if(localStorage.getItem("token")){
            getAllNotes();

        }
        else{
            navigate("/login")

        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

    const editNotes = (currentNote) => {
        // console.log(currentNote)
        ref.current.click()
        setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
    }

    const updateNote = (e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        // console.log("Updatating the",note)
        props.alertMessage("Note Updated Successfully","success")

    }
    
    const onChanged =(e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }






    return (
        <>
            <AddNote alertMessage={props.alertMessage}/>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter" ref={ref}>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle"  name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChanged} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription"  name="edescription" value={note.edescription} onChange={onChanged} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChanged} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h3>Your Notes</h3>
                <div className="container">
                {notes.length  === 0 && "Note Notes To Display"}
                </div>
                {notes.map((note) => {
                    console.log(note._id)
                    return <NoteItem  editNote={editNotes} note={note} key={note._id} alertMessage={props.alertMessage}/>
                })}
            </div>

        </>
    )
}
