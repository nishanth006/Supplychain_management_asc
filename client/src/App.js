import React, { useContext, useEffect, useState } from 'react';
import './App.css'; 
import { ContractProvider,ContractContext } from './Components/Contract';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Log from './Components/Login_Signup/Log';

import Navbar from './Components/ADST/Navbar'
import New_request from './Components/ADST/New_request'
import My_requests from './Components/ADST/My_requests'
import Division_requests from './Components/ADST/Division_requests'
import Accepted_reqs from './Components/ADST/Accepted_reqs';
import Transaction_history from './Components/Transaction_history';

import Navbar_DDST from './Components/DDST/Navbar__DDST';
import My_units from './Components/DDST/My_units';
import Pending from './Components/DDST/Pending';
import Completed from './Components/DDST/Completed';
import Req_from_asc from './Components/DDST/Req_from_asc';

import Navbar_dgst from './Components/DGST/Navbar_dgst';
import Reqs_from_div from './Components/DGST/Reqs_from_div';
import Pending_asc from './Components/ADST/Pending_asc';
import Register_unit from './Components/DGST/Register_unit';
import Register_div from './Components/DGST/Register_div';




function App() {
  const [auth,setAuth]=useState("false");
  const [user_name,setUser_name]=useState(); 
  const [role,setRole]=useState();
  useEffect(()=>{
    let Role=sessionStorage.getItem('role');
    let user_details=JSON.parse(sessionStorage.getItem('user_details'));
    let User_name=sessionStorage.getItem('user_name');
    let temp=sessionStorage.getItem('auth');
    console.log(temp);
    setAuth(temp);
    setRole(Role);
    setUser_name(User_name);
    
  },[auth] )
  useEffect(()=>{
    let Role=sessionStorage.getItem('role');
    let user_details=JSON.parse(sessionStorage.getItem('user_details'));
    let User_name=sessionStorage.getItem('user_name');
    let temp=sessionStorage.getItem('auth');
    console.log(temp);
    setAuth(temp);
    setRole(Role);
    setUser_name(User_name);
    
  },[] )
  console.log(typeof(auth))
  console.log(role);
  if(auth=="false" || auth==null){
    return(
      <ContractProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Log setAuth={setAuth}/>}/>
        </Routes>          
      </Router>
    </ContractProvider>
    );
    
  }
  else if(auth=="true" && role=='adst'){
  return (
          <ContractProvider>
          	<Router>
              <Navbar setAuth={setAuth}/>
              <Routes>

                <Route path="/" element={<New_request/>}/>
                <Route path="/My_Requests" element={<My_requests/>}/>
                <Route path="/Division_requests" element={<Division_requests/>}/>
                <Route path="/Accepted_requests" element={<Accepted_reqs/>}/>
                <Route path="/asc_requests" element={<Pending_asc/>}/>
                <Route path='/Transaction_history' element={<Transaction_history/>}/>

              </Routes>
                 
          	</Router>
          </ContractProvider>
    );
  }
  else if(auth=="true" &&role=='ddst'){
    return(

      <ContractProvider>

              <Router> 
                  <Navbar_DDST setAuth={setAuth}/>
                <Routes>

                  <Route path="/" element={<My_units/>}/>
                  <Route path="/pending/:unit" element={<Pending/>}/>
                  <Route path="/completed/:unit" element={<Completed/>}/>
                  <Route path="/Requests_from_asc" element={<Req_from_asc/>}/>
                  <Route path='/Transaction_history' element={<Transaction_history/>}/>
                </Routes>
                  
              </Router>
            </ContractProvider>
    );
  }
  else if(auth=="true" && role=='asc'){
    return(
      <ContractProvider>

              <Router>
                
              <Navbar_dgst setAuth={setAuth}/>
                
      
                <Routes>
                  <Route path='/' element={<Reqs_from_div/>}/>
                  <Route path='/Transaction_history' element={<Transaction_history/>}/> 
                  <Route path='/register_unit' element={<Register_unit/>}/> 
                  <Route path='/register_div' element={<Register_div/>}/> 
                </Routes>
                  
              </Router>
            </ContractProvider>

    );
  }
}

export default App;

