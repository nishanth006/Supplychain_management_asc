import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Table_order from './Table_order'
import waiting from '../Images/waiting.jpg'
import { ContractContext } from "../Contract";
import { FcApproval } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";
import Status from "../Status";
function My_requests() {
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    const user_name=user_details.user_name;
  const { contract } = useContext(ContractContext);
    var [details, setDetails] = useState([[]]);
    const [display,setDisplay] = useState(-1);
    const [items,setItems]=useState([]);
    const [quantity,setQuantity]=useState([]);
    const [loaded,setLoaded]=useState(true);

    const handleclick=(index)=>{
      setItems(details[1][index].split(" "));
      setQuantity(details[2][index].split(" "));
      setDisplay(index);
      
    }
    console.log(details);
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                var temp = await contract.methods.get_my_req(user_name).call(); 
                setDetails(temp);
                setLoaded(true);
            } 
        }
        get();
    }, [contract]);
    return (
        <div className="container mt-5 ">
            <h4 className="float-end mb-5">{user_name}</h4>
            <div className=""> 
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
                            <th scope="col">Status</th>
                            <th scope="col">Accepted by</th>
                            <th scope="col">Request</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider" >
                        {details[0].map((id,index)=><tr><td>{parseInt(id)}</td>
                            <td>{details[3][index]!='none'?<p>Success <FcApproval/></p> :<p>Pending <MdOutlinePending/></p>}</td>
                            <td>{details[3][index]}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View Request</button></td></tr>
                             
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
                                <div className=""><b>Accepted By</b>   :    {details[3][display]}</div>
                                    <div className="row mb-2"><div className="col-2"><b >Status</b></div>     :    {details[3][display]!='none'?<div className="col d-flex">Success <FcApproval className="mt-2"/></div> :<div className="col">Pending <MdOutlinePending/></div>}</div>
                                    <Table_order items={items} quantity={quantity}/>
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
export default My_requests;