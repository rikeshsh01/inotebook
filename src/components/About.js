import { useContext , useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';

export default function About() {
    const a = useContext(noteContext)

    useEffect(() => {
      a.update();
      // eslint-disable-next-line 
    }, [])
    

  return (
    <div>
      This is About {a.state.name} and is in {a.state.class}
    </div>
  )
}
