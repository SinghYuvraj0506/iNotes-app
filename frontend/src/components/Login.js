import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

export const Login = (props) => {
    const [user,setUser] = useState({email:"",password:""})
    const history = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:user.email ,password:user.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem("token",json.authtoken)
            history("/")
            props.showAlert("Logged In Successfully","success")
          }
          else{
            props.showAlert("Invalid Details","danger")
          }
    }


    const OnChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})

    }
  return (
    <>
    <div className="container">
        <h1 className="my-3">Login into your Account</h1>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            aria-describedby="emailHelp"
            onChange={OnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={OnChange}
          />
        </div>
    
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
    </>
  );
};
