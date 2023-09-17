import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Table_order from './Table_order'
import waiting from '../Images/waiting.jpg'
import { ContractContext } from "../Contract";
import { FcApproval } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";
import Status from "../Status";
import Swal from "sweetalert2";
import axios from "axios";

function Pending_asc() {
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    const user_name=user_details.user_name;
    const division=user_details.division;
  const { web333,contract } = useContext(ContractContext);
    var [details, setDetails] = useState([[]]);
    const [display,setDisplay] = useState(-1);
    const [items,setItems]=useState([]);
    const [quantity,setQuantity]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const [order,setOrder]=useState([]);
    console.log("details",details);
    const handleclick=async(index)=>{
        var temp = await contract.methods.get_order(details[0][index]).call(); 
        console.log(temp[0]);
        console.log(temp[1]);
        setItems( temp[0].split(" "));
        setQuantity(temp[1].split(" "));
        setDisplay(index);
      
    }
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                console.log(details);
                var temp = await contract.methods.get_forwarded_to_units(division).call(); 
                setDetails(temp);
                setLoaded(true);
            } 
        }
        get();
    }, [contract]);
    const accept=()=>{
        const { ethereum } = window;
        if(web333!=null){

          web333.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                console.log(details[1][display]);
                return contract.methods.accept_req(user_name,parseInt(details[0][display]),division).send({ from: acc });
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
                      console.log("not successfull")
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
        <div className="container mt-2 ">
            <h4 className="float-end mb-5">{user_name}</h4>
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
                            <th scope="col">Requested unit</th>
                            <th scope="col">Request from division</th>
                            <th scope="col">Status</th>
                            <th scope="col">Request</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider" >
                        {details[0].map((id,index)=><tr><td>{parseInt(id)}</td>
                            {/* <td>{details[3][index]!='none'?<p>Success <FcApproval/></p> :<p>Pending <MdOutlinePending/></p>}</td> */}
                            <td>{details[1][index]}</td>
                            <td>{details[2][index]}</td>
                            <td>pending</td>
                            <td>
                            <button type="button" className="btn btn-primary" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View</button></td></tr>
                             
                        )}
                    </tbody>
                </table>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Request ID</b>    :    {parseInt(details[0][display])}</h1>
                                    
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                   
                                    <Table_order items={items} quantity={quantity}/>
                                    <Status status={details[4][display]} acc_unit="none"/>
                                    <div className="mt-2">
                                        {(parseInt(details[1][display])>=4)?
                                            <button className="btn btn btn-success"  disabled> Accept</button>:
                                            <button className="btn btn btn-success" onClick={accept}  data-bs-dismiss="modal">Accept</button>
                                        }
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                :
                <div className="mt-5 d-flex justify-content-center align-items-center " style={{height: "70vh"} }>

                    <h1 className="text-center " >No requests</h1> 
                </div>}</div>}
                    
            </div>
        </div>
    );
}
export default Pending_asc;