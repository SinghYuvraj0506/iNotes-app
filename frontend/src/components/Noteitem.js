import React , {useContext,useState}from 'react'
import NoteContext from "../context/notes/noteContext";

export const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const {deletenote} = context;

  return (
    <div className="col-md-3 my-2">
      <div className="card border border-dark rounded">
      <span className="badge text-bg-info">{props.note.tag}</span>
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5> 
          <p className="card-text">{props.note.description}</p>
          <i className="fa-solid fa-pen-to-square mx-2 " onClick={() => {props.updateNotes(props.note)}}></i>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(props.note._id)}}></i>
        </div>
      </div>
    </div>
  );
};
