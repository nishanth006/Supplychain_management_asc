import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContractContext } from "../Contract";
import Pending from "./Pending";

function My_units(){

    const user_details=JSON.parse(sessionStorage.getItem('user_details'));
    console.log(user_details);
    const user_name=user_details.user_name;
    const { contract } = useContext(ContractContext);
    const [details, setDetails] = useState([[]]);
    const [ind,setInd]=useState(-1);
    console.log(details);

    useEffect(() => {
        const get = async () => {
            if (contract && contract.methods !== undefined) {
                const temp = await contract.methods.get_adsts(user_name).call();
                setDetails(temp);
            } 
        }
        get();
    }, [contract]);
    const  handleClick=(index)=>{
        // setUnit(details[0][index]);
        setInd(index);
    }
    return(
        <div className="container">
            <h4>{user_name}</h4>
            <h3 className="text-center ">My units</h3>
            <table className="table table-hover mt-5">
                <thead className="table-dark">
                <tr>
                <th scope="col">Sid</th>
                <th scope="col">Unit id</th>
                <th scope="col">Pending</th>
                <th scope="col">Completed</th>
                </tr>
            </thead>
            <tbody className="table-group-divider" >
                
                {details[0].map((id,index)=><tr>
                    <td>{index+1}</td>
                    <td>{details[0][index]}</td> 
                    <td><Link to={`/pending/${details[0][index]}`} className="btn btn-primary position-relative" onClick={()=>handleClick(index)}>
                            View
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {   parseInt(details[1][index])}
                                <span class="visually-hidden">unread messages</span>
                            </span>
                            </Link>
                    </td>
                    <td><Link to={`/completed/${details[0][index]}`} className="btn btn-success" onClick={()=>handleClick(index)}>View</Link></td></tr>)}
            </tbody>
            </table>
            {/* {(ind!==-1 && parseInt(details[1][ind])!=0)?<Pending  unit={details[0][ind]}/>:""} */}
            
        </div>
    );
}
export default My_units;