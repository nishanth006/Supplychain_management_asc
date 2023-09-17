import React, { useContext, useEffect, useState } from 'react'
import { ContractContext } from "../Contract";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Request from './Request';
const Pending = () => {
    const { contract } = useContext(ContractContext);
    const {unit}=useParams();
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    const user_name=user_details.user_name;
    const [details,setDetails]=useState([[]]);
    var [display,setDisplay]=useState(0);
    console.log(details);
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                const temp = await contract.methods.pending_reqs(unit).call();
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
      {(details[0].length!==0)?
      
      <div className="">

      
        <table className="table table-hover mt-5">
                <thead className='table-dark'>
                <tr>
                <th scope="col">Request Id</th>
                <th scope="col">Status</th>
                <th scope="col">Accepted by</th>
                <th scope="col">Request</th>
                </tr>
            </thead>
            <tbody className="table-group-divider" >
                {details[0].map((id,index)=><tr><td>{parseInt(id)}</td>
                <td>Pending</td>
                <td>{details[3][index]}</td>
                    <td><button className="btn btn-success" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View Request</button></td></tr>)}
            </tbody>
            </table>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Request id  :  {parseInt(details[0][display])}
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className=""><b>Accepted by</b>   :    {details[3][display]}</div>
                                <Request request_id={parseInt( details[0][display])} str_items={details[1][display]}  str_quantity={details[2][display]} acc_by={details[3][display]} status={details[4][display]}/>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>:""}

    </div>
  )
}

export default Pending