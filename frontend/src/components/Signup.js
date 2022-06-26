import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {

    const [user,setUser] = useState({name:"",email:"",password:"",cpassword:""})
    const history = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
      
            body: JSON.stringify({name:user.name ,email:user.email ,password:user.password}),
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem("token",json.authtoken)
            history("/")
            props.showAlert("Account Created Successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }   


    const OnChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})

    }

  return (
    <>
    <div className="container">
        <h1 className="my-3">Create Account to use iNotes</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            aria-describedby="emailHelp"
            onChange={OnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            aria-describedby="emailHelp"
            onChange={OnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            required
            onChange={OnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
            onChange={OnChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="check" checked readOnly/>
          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree to all the Terms and Conditions of iNotes
          </label>
        </div>
        <button disabled={user.password===user.cpassword ?false:true} type="submit" className="btn btn-primary" >
          Sign Up
        </button>
      </form>
      </div>
    </>
  );
};
