import React, { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import waiting from '../Images/waiting.jpg'
import { ContractContext } from "../Contract";
import Table_order from "./Table_order";

function Accepted_reqs() {
    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    const user_name=user_details.user_name;
    const { contract } = useContext(ContractContext);
    var [details, setDetails] = useState([[]]);
    const [display,setDisplay] = useState(-1);
    const [items,setItems]=useState([]);
    const [quantity,setQuantity]=useState([]);
    const handleclick=async(index)=>{
        let temp = await contract.methods.get_order(details[0][index]).call(); 
        setItems(temp[0].split(" "));
        setQuantity(temp[1].split(" "));
        setDisplay(index);
    }
    console.log("details",details);
    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                console.log(details);
                let temp = await contract.methods.get_accepted_reqs(user_name).call(); 
                setDetails(temp);
            } 
        }
        get();
    }, [contract]);
    return (
        <div className="container mt-5 ">
           <h4 className="float-end mb-3">{user_name}</h4>
            <div className="mb-5"> 
                {(details[0].length !== 0)?
                <div className="">
                    <table className="table table-hover mt-5">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Request Id</th>
                                <th scope="col">Requested By</th>
                                <th scope="col">Status</th>
                                <th scope="col">Requested From division</th>
                                <th scope="col">Request</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider" >
                            {details[1].map((id,index)=><tr><td>{parseInt(id)}</td>
                                <td>{details[0][index]}</td>
                                <td>pending</td>
                                <td>{details[3][index]}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>handleclick(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">View Request</button></td></tr>
                                )}
                        </tbody>
                    </table>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Request id  :  {display}
                                    </h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-2"><b>Requested by : </b>{details[0][display]}</div>
                                    <Table_order items={items} quantity={quantity}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :<div className="mt-5 d-flex justify-content-center align-items-center " style={{height: "60vh"} }>

                <h1 className="text-center " >No Accepeted Requests</h1> 
            </div>} 
            </div>
        </div>
    );
}
export default Accepted_reqs;