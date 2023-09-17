import React, { useContext, useEffect, useState } from "react";
import { ContractContext } from "../Contract";
import axios from "axios";
import Swal from 'sweetalert2'
function Request({request_id,str_items,str_quantity,acc_by,status}){ 
    const { web333,contract } = useContext(ContractContext);
    const user="div_0";
    var [items,setItems]=useState([]);
    var [quantity,setQuantity]=useState([]);
    var [raise,setRaise]=useState(false);
    const forward_units=()=>{
        const { ethereum } = window;
        if(web333!=null){
        web333.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                return contract.methods.forward_to_units(user,request_id).send({ from: acc });
            }).then(async function (tx) { 
                console.log(tx); 
                Swal.fire(
                    '',
                    'Succesfully forwarded to units',
                    'success'
                  )
                
                var from=tx.from;
                  var to=tx.to;
                  var transactionHash=tx.transactionHash;
                  var gasUsed=String(tx.gasUsed);
                  var role="ddst";
                  var user_name="div_0";
                  var purpose="Request forwarded to units under me"
                try{
                    console.log("request id",request_id);

                  await axios.post("http://localhost:8000/post_transaction/",{from,to,transactionHash,gasUsed,role,user_name,request_id,purpose})
                  .then(res=>{
                      if(res.data==="success"){
                          console.log("transaction successful")
                      }
                      else{
                        alert(res.data);
                      }
                  })
                  .catch(e=>{
                      alert("not successfull")
                      console.log(e);
                  })
                  console.log(request_id);
      
                }
              catch(e){
                console.log(e);
              }
                setRaise(true); 
                setRaise(true); 
            }).catch(function (tx) {
            console.log(tx);
            })
        }
    }
    const forward_asc=()=>{
        const { ethereum } = window;
        if(web333!=null){
        web333.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                return contract.methods.forward_to_asc(user,request_id).send({ from: acc });
            }).then(async function (tx) { 
                console.log(tx); 
                Swal.fire(
                    '',
                    'Successfully fowarded request to ASC',
                    'success'
                  )
                var from=tx.from;
                  var to=tx.to;
                  var transactionHash=tx.transactionHash;
                  var gasUsed=String(tx.gasUsed);
                  var role="ddst";
                  var user_name="div_0";
                  var purpose="Request forwarded to ASC"
                try{
                    // console.log(req_id);

                  await axios.post("http://localhost:8000/post_transaction/",{from,to,transactionHash,gasUsed,role,user_name,request_id,purpose})
                  .then(res=>{
                      if(res.data==="success"){
                          console.log("Transaction successfull")
                      }
                      else{
                        alert(res.data);
                      }
                  })
                  .catch(e=>{
                      alert("not successfull")
                      console.log(e);
                  })
      
                }
              catch(e){
                console.log(e);
              }
                setRaise(true); 
            }).catch(function (tx) {
            console.log(tx);
            })
        }
    }
  useEffect(() => {
    const get = async () => {
        setItems(str_items.split(" "));
        setQuantity(str_quantity.split(" "));
        if(acc_by==="none"){
            if(parseInt(status)>=2 )document.getElementById("frwd_unit").disabled=true;
            else document.getElementById("frwd_unit").disabled=false;
        }
        if(acc_by==="none"){
            if(parseInt(status)>=3 )document.getElementById("frwd_asc").disabled=true;
            else document.getElementById("frwd_asc").disabled=false;
        }
    }
    get();
}, [request_id]);
    return(
        <div className=""> 
            <table className="table table-hover mt-5">
                <thead className="table-dark">
                <tr>
                    <th scope="col">#</th> 
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody className="table-group-divider" >
                {items.map((id,index)=>(id!="")?<tr><td>{index}</td><td>{id}</td><td>{quantity[index]}</td></tr>:"")}
            </tbody>
            </table>

            <button className="btn btn-success me-3" onClick={forward_units} id="frwd_unit" data-bs-dismiss="modal">Forward to units</button>
            <button className="btn btn-warning" onClick={forward_asc} id="frwd_asc" data-bs-dismiss="modal">Forward to asc</button>
        </div>
    );
}
export default Request;