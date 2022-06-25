import React , {useContext,useState}from 'react'
import NoteContext from "../context/notes/noteContext";

export const Addnote = () => {
    const context = useContext(NoteContext)
    const {addnote} = context;

    const [note,setNote] = useState({title:"",desc:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addnote(note.title,note.desc,note.tag)
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="conatiner my-3">
    <h1>Add a Note</h1>
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={onChange}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="desc"
          name="desc"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
        />
      </div>
      <button type="submit" onClick={handleClick} className="btn btn-primary">
        Add Note
      </button>
    </form>
  </div>
  )
}
