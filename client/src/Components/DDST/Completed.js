import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from "../Contract";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Request from './Request';
const Completed = () => {
    const {unit}=useParams();
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    const user_name=user_details.user_name;
    const { contract } = useContext(ContractContext);
    const [details,setDetails]=useState([[]]);
    var [display,setDisplay]=useState(0);
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                const temp = await contract.methods.get_completed_reqs(unit).call();
                console.log(temp);
                setDetails(temp);
            } 
        }
        get();
    }, [contract,unit]);
    const handleclick=(index)=>{
      setDisplay(index);
    }
  return (
    <div className='container'>
      <h3 className='text-center'>{unit}</h3>
      {(details[0].length!=0)?
      <div className="">

       <table className="table table-hover mt-5">
            <thead className='table-dark'>
            <tr>
              <th scope="col">Request Id</th>
              <th scope="col">Accepted by</th>
              <th scope="col">Request</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
              {details[0].map((id,index)=><tr><td>{parseInt(details[1][index])}</td>
              <td>{id}</td>
              <td><button className="btn btn-success" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View Request</button></td></tr>)}
          </tbody>
        </table>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Request ID</b>    :    {parseInt(details[1][display])}</h1>
                                    
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className=""><b>Accepted By</b>   :    {details[0][display]}</div>
                                    {/* <div className="row mb-2"><div className="col-2"><b >Status</b></div>     :    {details[3][display]!='none'?<div className="col d-flex">Success <FcApproval/></div> :<div className="col">Pending <MdOutlinePending/></div>}</div> */}
                                <Request request_id={details[1][display]} str_items={details[2][display]}  str_quantity={details[3][display]} acc_by={details[0][display]} />
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                        :""}
          {/* {(ind!=-1)?<Request request_id={details[0][ind]} str_items={details[1][ind]}  str_quantity={details[2][ind]} acc_by={details[3][ind]} status={details[4][ind]}/>:""} */}
    </div>
  )
}

export default Completed