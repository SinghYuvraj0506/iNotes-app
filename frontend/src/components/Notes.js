import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Noteitem } from "./Noteitem";
import NoteContext from "../context/notes/noteContext";
import { Addnote } from "./Addnote";

export const Notes = (props) => {
  const history = useNavigate()
  const context = useContext(NoteContext);
  const { notes, getnotes, editnote } = context;

  const [note,setNotes] = useState({id:"",etitle:"",edescription:"",etag:""})
  useEffect(() => {
    if(localStorage.getItem("token")){
      getnotes();
    }
    else{
      history("/login")
    }
    // eslint-disable-next-line 
  }, []);

  const updatenotes = (current_note) => {
    ref.current.click();
    setNotes({id:current_note._id,etitle:current_note.title,edescription:current_note.description,etag:current_note.tag})
  };

  const handleClick = (e) => {
    console.log(note)
    ref2.current.click()
    editnote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Note Updated Successfully","success")
  };
  const onChange = (e) => {
    setNotes({...note,[e.target.name]:e.target.value})
  };

  const ref = useRef(null);
  const ref2 = useRef(null);

  return (
    <>
      <Addnote showAlert={props.showAlert}/>

          {/*its refernce is used by the edit buttons on the notes and its display = none */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={ref2}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container row mx-2">

        {notes.length===0 && "No Notes to Display"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNotes={updatenotes} showAlert={props.showAlert} note={note} />
            );
          })}
          </div>
      </div>
    </>
  );
};
