import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const s1 = {   // this state is being passed as value to the notestate
        "name":"Yuvraj",
        "class":"10B"
    }

    const [state,setState]=useState(s1)

    const update = () => {
        setTimeout(() => {
            setState({
                "name":"Golu",
                "class":"12B"
            }) 
        }, 3000);
    }

    return(
        <NoteContext.Provider value={{state,update}}> {/* here we use the context created and the router whch are wrapped inside the notestate can access the state passed here ith the help of use context hook */}
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;