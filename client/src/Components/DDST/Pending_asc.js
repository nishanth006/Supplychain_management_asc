import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Table_order from './Table_order'
import waiting from '../Images/waiting.jpg'
import { ContractContext } from "../Contract";
import { FcApproval } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";
import axios from "axios";
import Status from "../Status";
import Swal from "sweetalert2";

function Pending_asc() {
  const { web333,contract } = useContext(ContractContext);
    var [details, setDetails] = useState([[]]);
    const [display,setDisplay] = useState(-1);
    const [items,setItems]=useState([]);
    const [quantity,setQuantity]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const [order,setOrder]=useState([]);
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    const user_name=user_details.user_name;
console.log("details",details);
    const handleclick=async(index)=>{
        var temp = await contract.methods.get_order(details[1][index]).call(); 
        // console.log(temp);
        // setOrder(temp);
        // if(order[0]!="")
        console.log(temp[0]);
        console.log(temp[1]);
        setItems( temp[0].split(" "));
        setQuantity(temp[1].split(" "));
        setDisplay(index);
      
    }
    const frwd_unit=()=>{
        
        const { ethereum } = window;
        if(web333!=null){
        web333.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                return contract.methods.asc_forward_to_units(user_name,parseInt(details[1][display])).send({ from: acc });
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
                  var role="ddst";
                  var user_name=user_details.user_name;
                  console.log(user_name);
                  var purpose="Request forwarded to units under me"
                try{
                    let request_id=parseInt(details[1][display]);
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
                      console.log("not successfull")
                      console.log(e);
                  })
      
                }
              catch(e){
                console.log(e);
              }
            }).catch(function (tx) {
            console.log(tx);
            })
        }
    }
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                console.log(details);
                console.log("user_name",user_name);
                var temp = await contract.methods.get_pending_forwarded_to_div(user_name).call(); 
                setDetails(temp);
                setLoaded(true);
            } 
        }
        get();
    }, [contract]);
    return (
        <div className="container mt-5 ">
            <div className="mb-5"> 
                {(loaded===false)?
                    <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                      <b className="ms-2"> Please Wait</b>
                  </div>
                  :<div>
                    

                {(details[0].length !== 0)?
                <div className="">
                
                <table className="table table-hover  dataTable mt-5">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Request Id</th>
                            <th scope="col">Request from division</th>
                            <th scope="col">Status</th>
                            <th scope="col">Requested unit</th>
                            <th scope="col">Request</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider" >
                        {details[1].map((id,index)=><tr><td>{parseInt(id)}</td>
                            {/* <td>{details[3][index]!='none'?<p>Success <FcApproval/></p> :<p>Pending <MdOutlinePending/></p>}</td> */}
                            <td>{details[2][index]}</td>
                            <td>pending</td>
                            <td>{details[0][index]}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View</button></td></tr>
                             
                        )}
                    </tbody>
                </table>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Request ID</b>    :    {parseInt(details[1 ][display])}</h1>
                                    
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                   
                                    <Table_order items={items} quantity={quantity}/>
                                    <Status status={details[3][display]} acc_unit="none"/>
                                    <div className="mt-2">
                                        {(parseInt(details[4 ][display])>=5)?<button className="btn btn btn-warning" disabled>Forward to Units</button>:
                                        <button className="btn btn btn-warning" onClick={frwd_unit} data-bs-dismiss="modal">Forward to Units</button>}
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                :<div className="mt-5 d-flex justify-content-center align-items-center " style={{height: "70vh"} }>

                <h1 className="text-center " >No requests</h1> 
            </div>}</div>}
                    
            </div>
        </div>
    );
}
export default Pending_asc;