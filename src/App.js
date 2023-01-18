import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert,setAlert] = useState(null);
  const alertMessage =(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
      
    }, 2000);

  }
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home alertMessage={alertMessage}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login alertMessage={alertMessage}/>} />
              <Route path="/signup" element={<Signup alertMessage={alertMessage}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
