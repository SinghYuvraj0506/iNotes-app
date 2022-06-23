import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'


export default function About() {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>This is About {a.state.name} And he is in {a.state.class}</div>
  )
}
