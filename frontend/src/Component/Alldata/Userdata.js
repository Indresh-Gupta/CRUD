import React from "react";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";


function Userdata() {

  const [user, setUser]=useState([])

   useEffect(()=>{

    const fetch=async()=>{
     const response= await axios.get("http://localhost:8080/api/getAll")
     setUser(response.data);
    }
   fetch();
  }, [])

  const deleteUser=async(userId)=>{
   await axios.delete(`http://localhost:8080/api/delete/${userId}`)
   .then((response)=>{
     setUser((prevuser)=>prevuser.filter((user)=> user._id!==userId))
     console.log(response);
   }).catch((error)=>{
    console.log(error);
   });
  }

    return ( 
        <>
      <Link to={"/Add"} > <button>Add new data</button> </Link>
        <h1>User all information shown here </h1>
        <table border={1}>
            <thead>
             <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Email_Id</th>
                <th>Action</th>
             </tr>
            </thead>
            <tbody>
              {
                user.map((user, index)=>{
                  return(
                  <tr key={user._id}>
                <td>{index}</td>
                <td>{user.fname } {user.lname}</td>
                <td>{user.email}</td>
                <td>
                    <button onClick={()=>deleteUser(user._id)}>delete</button>
                    <Link to={`/edit/`+user._id}><button>Edit</button></Link>
                </td>
              </tr>
                  )
                })
              }
             
            </tbody>
        </table>

        </>
     );
}

export default Userdata;