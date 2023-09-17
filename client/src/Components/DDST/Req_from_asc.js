import React, { useState } from 'react'
import Pending_asc from './Pending_asc';
import Accepted_asc from './Accepted_asc';

const Req_from_asc = () => {
    const [opt,setOpt]=useState();
    const handleclick=(e)=>{
        document.getElementById(e.target.id).checked=true;
        setOpt(e.target.value);
    }
    
  return (
    <div className='container'>
        <div className="btn-group"  role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check"  name="btnradio" id="btnradio1" value='pending' autocomplete="off" checked onClick={handleclick}/>
            <label className="btn btn-outline-primary" for="btnradio1">Pending</label>

            <input type="radio" className="btn-check " name="btnradio" id="btnradio2" value='accepted' autocomplete="off" onClick={handleclick}/>
            <label className="btn btn-outline-primary" for="btnradio2">Accepted</label>
        </div>
        {(opt=='pending')?<Pending_asc/>:<Accepted_asc/>}
    </div>
  )
}

export default Req_from_asc