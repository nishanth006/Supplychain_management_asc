import React, { useContext, useState } from "react";
import { ContractContext } from "../Contract";
import waiting from '../Images/waiting.jpg'
import { FcEmptyTrash } from "react-icons/fc";
import { BsPlusSquareFill } from "react-icons/bs";
import axios from "axios";
import Swal from 'sweetalert2'
function New_request(){
  
  const user_details=JSON.parse(sessionStorage.getItem('user_details'));
  // console.log(user_details);
  const user_name=user_details.user_name;
  console.log("user name:",user_name);
  const { web333,contract } = useContext(ContractContext);
    const [temp,setTemp]=useState({
        item:"",
        quantity:0
    })
    const [order,setOrder]=useState([])
    const [req_id,setReq_id]=useState();
    const handlechange=(e)=>{
      setTemp({...temp,[e.target.name]:e.target.value});
    }
    let {item,quantity}=temp;
    const add=()=>{
			setOrder([...order,{item,quantity}]);
      	setTemp({
        	item:"",
        	quantity:""
      	})
    }
	const Remove=(index)=>{
        console.log(index);
        setOrder(() =>
            order.filter((id,ind) => ind !== index));
		console.log(order);
    }
	const send=()=>{
		let str_items="";
    let str_quantity="";
		order.map((id,index)=>{
			str_items+=id.item;  
            str_items+=" ";
            str_quantity+=id.quantity;  
            str_quantity+=" ";
		})
        console.log(str_items); 
        const { ethereum } = window;
        if(web333!=null){

          web333.eth.getAccounts().then(async function (accounts) {
                var acc = accounts[0];
                console.log(user_name);
                let req_id=await contract.methods.get_latest_req_id().call();
                sessionStorage.setItem('req_id',req_id);
                return contract.methods.new_req(user_name,str_items,str_quantity).send({ from: acc });
            }).then(async function (tx) { 
              Swal.fire(
                '',
                'Request raised successfully',
                'success'
              )

                console.log(tx); 
                  var from=tx.from;
                  var to=tx.to;
                  var transactionHash=tx.transactionHash;
                  var gasUsed=String(tx.gasUsed);
                  var role="adst";
                  var user_name=user_details.user_name;
                  console.log(user_name);
                  var purpose="New Request"
                try{
                    let request_id=sessionStorage.getItem('req_id');
                    // console.log(req_id);

                  await axios.post("http://localhost:8000/post_transaction/",{from,to,transactionHash,gasUsed,role,user_name,request_id,purpose})
                  .then(res=>{
                      if(res.data==="success"){
                          console.log("Transaction successfull")
                          
                      }
                      else{
                        console.log(res.data);
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

              setOrder([]);
            }).catch(function (tx) {
              console.log(tx);
            })
        }
	}
   
    return(
    <div className="container mt-5 ">
      <h4 className="float-end">{user_name}</h4>
		<div className="h3">Request Form</div>
        
        <div className="row mt-5">
            <div className="mb-3 col-lg-4">
              <label for="" class="form-label">Item</label>
              <input type="text" className="form-control"  name="item" value={temp.item} onChange={handlechange}/ >
            </div>
            <div className="mb-3 col-lg-4">
              <label for="" class="form-label">Quantity</label>
              <input type="text" className="form-control" name="quantity" value={temp.quantity} onChange={handlechange}/>
            </div>
			      <div className=" col-lg-2"><button className="btn btn-lg" onClick={add}><BsPlusSquareFill className="mt-4"/> </button></div>
        </div>
          <button className="btn btn-success" onClick={send}>Submit</button>
          {
                <div className="">  
                {(order.length!=0)?
                <table className="table table-hover mt-5 ">
                    <thead className="table-dark">
                    <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider" >
                    {order.map((id,index)=><tr>
                      <td>{index+1}</td>
                      <td>{id.item}</td>
                      <td>{id.quantity}</td>
					  <td><button className='btn btn-lg' onClick={()=>Remove(index)}><FcEmptyTrash/></button></td>
                      </tr> 
                    )}
                </tbody>
                </table>:<div className="fs-1 mt-5 text-center">No items added</div>}
            </div>
          }
        </div>
    );
}
export default New_request; 