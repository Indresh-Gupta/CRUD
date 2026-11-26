import React from "react";
import {useState ,useEffect} from "react";
 import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";



function Edit() {
  
  const users={
    fname:"",
    lname:"",
    email:"",
  }

  const {id}=useParams();
  const Navigate=useNavigate();
  const [user, setUser]=useState(users);

//   const inputChangehandler = (e) => {
//   const { name, value } = e.target;

//   setUser((prevUser) => ({
//     ...prevUser,
//     [name]: value,
//   }));
// };

const inputChangehandler = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }));
};

  useEffect(()=>{
      axios.get(`https://crud-ix4s.onrender.com/api/getOne/${id}`)
      .then((response)=>{
        setUser(response.data);
      })
      .catch((error) =>{
        console.log(error);
      }) 
  }, [id])

  const submit=async(e)=>{
    e.preventDefault();
   await axios.put(`https://crud-ix4s.onrender.com/api/update/${id}`, user)
    .then((response)=>{
      console.log(response);
      Navigate("/");
    }).catch(error=>console.log(error));
  }


    return ( 
        <>
        <h1>Here you can edit the data</h1>
        <form onSubmit={submit}>
        <label htmlFor="fname">First Name</label>
        <input type="text" placeholder="Enter your first name"  value={user.fname || ""} onChange={inputChangehandler} name="fname" id="fname"/>
        <br/> <br/>
        <label htmlFor="lname">Last Name</label>
        <input type="text" placeholder="Enter your last name" value={user.lname} onChange={inputChangehandler} name="lname" id="lname"/>
        <br/> <br/>
        <label htmlFor="email">Email_id</label> 
        <input type="email" placeholder="Enter your email" value={user.email} onChange={inputChangehandler} name="email" id="email" />
        <br/> <br/>
        <button> Update</button>
       </form>
        </>
      );
}

export default Edit;