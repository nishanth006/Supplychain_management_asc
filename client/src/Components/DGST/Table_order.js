import React from "react";
function Table_order({items,quantity}){ 

    return(
        <div className=""> 
            <table className="table table-hover ">
                <thead className="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody className="table-group-divider" >
                {items.map((id,index)=>(id!=="")?<tr><td>{index+1}</td><td>{id}</td><td>{quantity[index]}</td></tr>:"")}
            </tbody>
            </table>
        </div>
    );
}
export default Table_order;
