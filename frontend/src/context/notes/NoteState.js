import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
  const host = "http://localhost:5000"
    const notesInitial = []   // this state is being passed as value to the notestate


    const [notes,setNotes]=useState(notesInitial)

    // 1. Getting all the notes for the respective data from /fetchallnotes endpoint
    const getnotes = async () =>{
    
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NGI4OTc3M2E1NzBlNmEwNTA4NjUwIn0sImlhdCI6MTY1MzkxMzgwNn0.jeM571ei6aoGxBnf1zJCkVxNW6lb7jcxHdGTedsOIKg'
        },
    
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    // 2. Adding notes from the respective data from /addnotes endpoint
    const addnote = async (title,desc,tag) =>{
      console.log("Adding a new Note")
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NGI4OTc3M2E1NzBlNmEwNTA4NjUwIn0sImlhdCI6MTY1MzkxMzgwNn0.jeM571ei6aoGxBnf1zJCkVxNW6lb7jcxHdGTedsOIKg'
        },
      
        body: JSON.stringify({title:title,description:desc,tag:tag}) 
      });
      const json = await response.json()
      console.log(json)
      setNotes(notes.concat(json))
      
    }

     // 3. Deleting notes from the respective data from /deletenotes endpoint
    const deletenote = async (id) =>{
      console.log("Adding a new Note")
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method:"DELETE",
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NGI4OTc3M2E1NzBlNmEwNTA4NjUwIn0sImlhdCI6MTY1MzkxMzgwNn0.jeM571ei6aoGxBnf1zJCkVxNW6lb7jcxHdGTedsOIKg'
        },
      
      });
      const json = await response.json()
      console.log(json)
      console.log("deleted note successfully")
      setNotes(notes.filter((note)=>{return note._id!==id}))

    }
    const editnote = async (id,title,desc,tag) =>{
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method:"PUT",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NGI4OTc3M2E1NzBlNmEwNTA4NjUwIn0sImlhdCI6MTY1MzkxMzgwNn0.jeM571ei6aoGxBnf1zJCkVxNW6lb7jcxHdGTedsOIKg'
        },
      
        body: JSON.stringify({title,desc,tag}) 
      });
      const json =  response.json();
    }


    return(
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnotes}}> {/* here we use the context created and the router whch are wrapped inside the notestate can access the state passed here ith the help of use context hook */}
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;