import React, {  useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Process_Flow from'../Images/Process_Flow.png'
function Log({setAuth}){
    const Navigate=useNavigate();
    const [user_name,setUser_name]=useState("");
    const [password,setPassword]=useState("");
    const handlechange1=(e)=>{
        // setUser({...user,[e.target.name]:e.target.value});
        setUser_name(e.target.value);
    }
    const handlechange2=(e)=>{
        // setUser({...user,[e.target.name]:e.target.value});
        setPassword(e.target.value);
    }
    const asc_login=()=>{
        var user_details={
            user_name:"ASC",
            role:"asc"
        }

        sessionStorage.setItem('user_details', JSON.stringify(user_details));
        sessionStorage.setItem('role', user_details.role);
        sessionStorage.setItem('auth',true)
        setAuth("true");  
        Navigate('/');
    }
    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/log/",{user_name,password})
            .then(res=>{
                if(res.data==="wrong"){
                    alert("Wrong credentials")
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
                else{
                    var user_details;
                    if(res.data.role==='adst'){

                         user_details={
                            division:res.data.division,
                            user_name:res.data.user_name,
                            role:res.data.role
                        }
                    }
                    else{
                         user_details={
                            user_name:res.data.user_name,
                            role:res.data.role
                        }
                    }
                    console.log(user_details);
                    sessionStorage.setItem('user_details', JSON.stringify(user_details));
                    console.log(user_details);
                    sessionStorage.setItem('role', user_details.role);
                    sessionStorage.setItem('auth',true)
                    setAuth("true");  
                    Navigate('/');
                    
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);
        }
    }
    return(
        <div className="container mt-5"  >
            <div className="me-4   float-end'">
                <button type="button" className='btn btn-primary me-4  ' data-bs-toggle="modal" data-bs-target="#exampleModal">Process Flow</button>
                <button className="btn btn-primary" onClick={asc_login}>ASC</button>

            </div>
            <div className="d-flex justify-content-center align-items-center " style={{height: "80vh"} }>
            <div className="col-5 ">
            <h2 className="text-center " >Login</h2>
            <form action="POST">
            <div className="mb-3">
                <label  className="form-label text-center">User name</label>
                <input type="text" name="user_name"  className="form-control" onChange={handlechange1} />
            </div>
            <div className="mb-3 ">
                <label  className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handlechange2} />
            </div>
            
            <button className="btn btn-success" onClick={submit}>Login</button>
            </form>
            </div>
        </div> 
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Process Flow</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <img src={Process_Flow} className="img-fluid" alt="..."/>
            </div>
            <div className="modal-footer">
                
            </div>
            </div>
        </div>
        </div>
        </div> 
    );
}
export default Log;