import React, { useContext, useState } from "react";
import axios from "axios"
import Swal from 'sweetalert2'
import { ContractContext } from "../Contract";
function Register_div(){
    const { web333,contract } = useContext(ContractContext);
    const [user_name,setUser_name]=useState("");
    const [password,setPassword]=useState("");
    // const Navigate=useNavigate();

    const handlechange1=(e)=>{
        setUser_name(e.target.value);
    }
    const handlechange2=(e)=>{
        setPassword(e.target.value);
    }
    async function submit(e){
        e.preventDefault();  
        console.log(user_name);
        console.log(password);
        try{

            await axios.post("http://localhost:8000/Register_div/",{user_name,password})
            .then(res=>{
                if(res.data==="exist"){
                    alert("User already exists")
                }
                else if(res.data==="notexist"){
                    Swal.fire(
                        '',
                        'Added division successfully ',
                        'success'
                      )
                    // const { ethereum } = window;
                    // if(web333!=null){
                    //     web333.eth.getAccounts().then(async function (accounts) {
                    //         var acc = accounts[0];
                    //         return contract.methods.register_unit(user_name).send({ from: acc });
                    //     }).then(async function (tx) { 

                    //         })
                    //         .catch(e=>{
                    //             console.log("wrong details")
                    //             console.log(e);
                    //         })
                    // }
                    
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
        <div className="container mt-5">
            <h2 className="text-center">Register DDST</h2>
            <div className="col-5 center  justify-content-center">
            <form action="POST">
            <div className="mb-3">
                <label  className="form-label">User name</label>
                <input type="text" name="user_name"  className="form-control" onChange={handlechange1} />
            </div>
            <div className="mb-3 ">
                <label  className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handlechange2} />
            </div>
            <input type="submit" className="btn btn-success" onClick={submit} />
            </form>
                
            </div>
        </div>  
    );
}
export default Register_div;