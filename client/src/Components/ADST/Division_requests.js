import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { ContractContext } from "../Contract";
import Table_order from "./Table_order";
import Swal from 'sweetalert2'
import axios from "axios";

function Division_requests() {
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    console.log(user_details.division)
    const { web333,contract } = useContext(ContractContext); 
    const user_name=user_details.user_name;
    var [details, setDetails] = useState([[]]);
    const [display,setDisplay] = useState(-1);
    const [items,setItems]=useState([]);
    const [quantity,setQuantity]=useState([]);
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                console.log(details);
                var temp = await contract.methods.div_pending_reqs(user_details.division).call(); 
                setDetails(temp);
            } 
        }
        get();
    }, [contract]);
    const handleclick=(index)=>{
      setItems(details[2][index].split(" "));
      setQuantity(details[3][index].split(" "));
      setDisplay(index);
    }
    const accept=()=>{
        const { ethereum } = window;
        if(web333!=null){

          web333.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                console.log(details[1][display]);
                console.log(user_details.division);
                return contract.methods.accept_req(user_name,parseInt(details[1][display]),user_details.division).send({ from: acc });
            }).then(async function (tx) { 
                console.log(tx); 
                Swal.fire(
                    '',
                    'Request accepted successfully',
                    'success'
                  ) 
                  console.log(tx); 
                  var from=tx.from;
                  var to=tx.to;
                  var transactionHash=tx.transactionHash;
                  var gasUsed=String(tx.gasUsed);
                  var role="adst";
                  var user_name=user_details.user_name;
                  var purpose="Accepted request"
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

                
            })
            .catch(function (tx) {
              console.log(tx);
            })
        }
	}
    return (
        <div className="container mt-5 ">
            <h4 className="float-end mb-5">{user_name}</h4>
            <div className="mb-5"> 
                {(details[0].length !== 0)?
                <div className="">
                    <div className="">
                        <table className="table table-hover mt-5">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Request Id</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Requested unit</th>
                                    <th scope="col">Request</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider" >
                                {details[1].map((id,index)=>(user_name!==details[0][index])?<tr><td>{parseInt(id)}</td>
                                    <td>pending</td>
                                    <td>{details[0][index]}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View Request</button></td></tr>         
                                    :"")
                                }
                            </tbody>
                        </table>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Request id  :  {display}
                                            </h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className=""><b>Requested unit</b>   :    {details[0][display]}</div>
                                            <Table_order req_unit={details[0][display]} req_id={details[1][display]} items={items} quantity={quantity}/>
                                            <div className=""><button className="btn btn-primary" onClick={accept} data-bs-dismiss="modal">Accept</button></div>
                                        </div>

                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                :<div className="mt-5 d-flex justify-content-center align-items-center " style={{height: "70vh"} }>

                    <h1 className="text-center " >No requests</h1> 
                </div>}
                
            </div>
        </div>
    );
}
export default Division_requests;