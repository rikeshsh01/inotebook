import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = (props) => {
    let navigate = useNavigate()

    const [signUp, setSignUp] = useState({name:"",email:"",password:"",cpassword:""});
    const handleSubmit =async (e)=>{
        e.preventDefault();
    const {name,email,password}=signUp;
    

        console.log("Clicked on submit :http://127.0.0.1:5000/api/auth/createuser")
        // API Call
        const response = await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name,email,password })// body data type must match "Content-Type" header
        });
        console.log(response)
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem("token",json.authToken)
            navigate("/");
            props.alertMessage("Created Account Successfully","success")
        }
        else{
            props.alertMessage("Invalid Input","danger")
        }
        
    }

    const onChanged =(e) =>{
        setSignUp({...signUp,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChanged} placeholder="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChanged} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChanged} id="password" name='password' placeholder="Password" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChanged} id="cpassword" name='cpassword' placeholder="Confirm Password" />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup
