import React,{useContext} from 'react';
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const { note, editNote } = props;
    // console.log(editNote);

    const editNoteClick = ()=>{
        editNote(note)
        // console.log(note)
    }

    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    
                    <div className="d-flex">
                    <p className="card-title"><strong>{note.title}</strong></p>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);  props.alertMessage("Note Deleted Successfully","success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={editNoteClick}></i>
                    </div>
                    <p className="card-text">Note Descriptn: {note.description}</p>
                    <p className="card-text">Note Tag: {note.tag}</p>
                    <p className="card-text">Note ID:{note._id}</p>


                </div>
            </div>
        </div>
    )
}

export default Noteitem