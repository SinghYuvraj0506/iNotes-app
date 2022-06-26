import React , {useContext,useState}from 'react'
import NoteContext from "../context/notes/noteContext";

export const Addnote = (props) => {
    const context = useContext(NoteContext)
    const {addnote} = context;

    const [note,setNote] = useState({title:"",desc:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addnote(note.title,note.desc,note.tag)
        setNote({title:"",desc:"",tag:""})
        props.showAlert("Note Added Successfully","success")
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
          minLength={3}
          value={note.title}
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
          value={note.desc}
          minLength={5}
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
          value={note.tag}
          onChange={onChange}
        />
      </div>
      <button disabled={(note.title.length<=3 || note.desc.length<=5)?true:false} type="submit" onClick={handleClick} className="btn btn-primary">
        Add Note
      </button>
    </form>
  </div>
  )
}
