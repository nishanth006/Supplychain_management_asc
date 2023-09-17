// import React, { useEffect, useState } from 'react'

// const Status = ({status,acc_unit,role}) => {
//     // const [progress,setProgress]=useState([]);
//     const progress=["Division","Units","ASC","Other division","units of division"];
//     console.log(parseInt(status),acc_unit);
//     var str='';
//     var temp;
//     if(acc_unit=='none'){
//         str='';
//     }
//     else{
//         str="bg-success";
//     }
//     // useEffect(() => {
//     //     const get = async () => {
//     //         if(parseInt(status)<3){
//     //             setProgress(["Division","Units"]);
//     //         } 
//     //         else{
//     //             setProgress(["Division","Units","ASC","Other division","units of division"]);
//     //         }
//     //     }
//     //     get();
//     // }, []);
//     if(role=="adst"){
//         const progress=["Division","Units","ASC","Other division","units of division"];
//         return (
//             <div>
//                 <h4>Status</h4>
//                 <div className="progress-stacked">
//                     {progress.map((stage,index)=>
//                         <div className="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
//                             <div className={`progress-bar ${str}`}>{stage}</div>
//                         </div> 
//                     )}
//                 </div>
//             </div>
//         )
//     }
//     else if(role=="ddst"){
//         const progress=["Units","ASC","Other division","units of division"];
//         return (
//             <div>
//                 <h4>Status</h4>
//                 <div className="progress-stacked">
//                     {progress.map((stage,index)=>
//                         <div className="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
//                             <div className={`progress-bar ${str}`}>{stage}</div>
//                         </div> 
//                     )}
//                 </div>
//             </div>
//         )
//     }
//     else if(role=="asc"){
//         const progress=["ASC","Other division","units of division"];
//         return (
//             <div>
//                 <h4>Status</h4>
//                 <div className="progress-stacked">
//                     {progress.map((stage,index)=>
//                         <div className="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
//                             <div className={`progress-bar ${str}`}>{stage}</div>
//                         </div> 
//                     )}
//                 </div>
//             </div>
//         )
//     }
// }

// export default Status
import React from 'react'

const Status = () => {
  return (
    <div></div>
  )
}

export default Status