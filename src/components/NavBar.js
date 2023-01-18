import React from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


export default function NavBar() {
    let navigate = useNavigate()

    let location = useLocation();
    const handleClick = ()=>{
        localStorage.removeItem("token");
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">I-Note Book</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/about"?"active":""}`} to='/about'>About</NavLink>
                            </li>
                        </ul>
                        
                        <form className="d-flex mx-1" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {!localStorage.getItem("token")?<div>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link>
                        <Link className="btn btn-primary" to="signup" role="button">Sign Up</Link>
                        </div>:<button className='btn btn-primary' onClick={handleClick}>log Out</button>}
                    </div>
                </div>
            </nav>

        </div>
    )
}
