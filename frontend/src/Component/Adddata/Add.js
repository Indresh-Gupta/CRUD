import React from "react";
import {Link, useNavigate} from "react-router-dom";
 import {useState} from "react";
 import axios from "axios";
 
function Add() {

    // const user={
    //     fname:"",
    //     lname:"",
    //     email:"",
    //     password:""
    // }
  
    // const [users, setUser]=useState(user);
    // const Navigate=useNavigate();

    // const inputhandler=(e)=>{
    //     const {name, value}=e.target;
    //    setUser({...users, [name]:value});
    // }

    // const submitForm=async(e)=>{
    //     e.preventDefault();
    //     await axios.post(`https://crud-ix4s.onrender.com/api/create`, users)
    //     .then((response)=>{
    //         console.log(response);
    //         Navigate("/");
    //     }).catch(error=>  console.log("some error occur:", error));
    // }

    const [user, setUser] = useState({
  fname: "",
  lname: "",
  email: "",
  password: "",
});

const inputhandler = (event) => {
  const { name, value } = event.target;

  setUser((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const submitForm = async (event) => {
  event.preventDefault();

  await axios.post(
    "https://crud-ix4s.onrender.com/api/create",
    user
  );
};


    return (  
        <>
        <h1>Here you can add new data</h1>
        <Link to={"/"}><button>Back</button></Link>
        <br></br>
        <br/>
       <form  onSubmit={submitForm}>
        <label htmlFor="fname">First Name</label>
        <input type="text" placeholder="Enter your first name" onChange={inputhandler} name="fname" id="fname"/>
        <br/> <br/>
        <label htmlFor="lname">Last Name</label>
        <input type="text" placeholder="Enter your last name" onChange={inputhandler} name="lname" id="lname"/>
        <br/> <br/>
        <label htmlFor="email">Email</label> 
        <input type="email" placeholder="Enter your email" onChange={inputhandler} name="email" id="email" />
        <br/> <br/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your password" onChange={inputhandler} name="password"  id="password"/>
        <br/> <br/>
        <button>Add Data</button>
       </form>
        </>
    );
}

export default Add;