import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar_DDST({setAuth}){
  const Navigate=useNavigate();
	const logout=()=>{
    sessionStorage.setItem('auth',false);
    sessionStorage.setItem('role', '');
    let temp={};
    sessionStorage.setItem('user_details', JSON.stringify(temp));
    Navigate('/');
    setAuth("false");

  }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
    <b className="navbar-brand" >DDST</b>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link active" aria-current="page" >My units</Link>
        </li>
        <li className="nav-item">
          <Link to='/Requests_from_asc' className="nav-link active" aria-current="page" >Asc_Requests</Link>
        </li>
        <li className="nav-item">
          <Link to='/Transaction_history'className="nav-link" >Transaction_history</Link>
        </li>
      </ul>
      <button className="btn btn-warning float-right me-5" onClick={logout}>Logout</button>
    </div>
  </div>
</nav>


    );
}
export default Navbar_DDST;