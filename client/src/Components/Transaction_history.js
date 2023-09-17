import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Transaction_history = () => {
  const [user_name,setUser_name]=useState();
  const [history,setHistory]=useState([]);
  console.log(history);
  useEffect(() => {
    const get = async () => {
      const user_details=JSON.parse(sessionStorage.getItem('user_details'));
        setUser_name(user_details.user_name);
        // console.log(user_name);

          await axios.post('http://localhost:8000/Transaction_history',{user_name})
          .then(hist=>{
            // console.log(hist.data);
            setHistory(hist.data)
          })
          .catch((err)=>console.log(err))
    }
    get();
}, [user_name]);
  console.log(history[0]);
  return (
    <div className="container">

    
      <div className=""><h4 className="float-end">{user_name}</h4></div>
    <div className='mt-3 '>
    {(history.length>0)?
      <div className="">
        {history.map((id,index)=>
          <div className="card mt-3">
          <h5 className="card-header">Request Id : {history[index].req_id}</h5>
          <div className="card-body">
            <h5 className="card-title col">TX Hash   </h5>{history[index].transactionHash}
            <p className="card-text">
              <div className="row">
                  <div className="col-lg">
                    <b>From</b>  :  {history[index].from}
                  </div>
                  <div className="col-lg">
                    <b>To</b>  :  {history[index].to}
                  </div>
                  <div className="col-lg">
                    <b>GasUsed</b>  :  {history[index].gasUsed}
                  </div>
                  <div className="col-lg">
                    <b>Purpose</b>  :  {history[index].purpose}
                  </div>
              </div>
            </p>
          </div>
          </div>
        )}
      </div>:""}
      
    </div>
    </div>

  )
}

export default Transaction_history