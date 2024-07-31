import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer } from "./reducer/dataAddToArray";
import { Link } from "react-router-dom";

const Main = () => {
  //   const customers = JSON.parse(localStorage.getItem('customerData'));
  const data = useSelector((state) => state.customers);
  const customers = data;
  const dispatch =useDispatch()
  const testHandle = () => {
    console.log(data);
    // localStorage.removeItem('customerData')
  };


 const deleteCustomerFromList=(e)=>{
  dispatch(deleteCustomer(e.target.id))
 }
  return (
    <>
      {/* <button onClick={testHandle}>test</button> */}
      <Link to="/">Back to customer form</Link>
      <h1 style={{fontFamily: "'Roboto', sans-serif"}}>Customers List</h1>
      {data.length==0 && <h3 style={{color:'#C3C3C3'}}>No Customers to display....</h3>}
      {customers?.map((customer, index) => (
        <div key={index}>
        <div
          style={{
            backgroundColor: "rgb(232 232 232)",
            padding: "15px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "600px",
            marginTop: "15px",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          <div style={{ }}>
            <div>
              <h2 style={{ margin: "10px 0px", fontWeight: 'bold' }}>{customer.name}</h2>
              <p style={{ margin: "5px 0" }}>PAN Number: {customer.pan}</p>
              <p style={{ margin: "5px 0" }}>Mob. Number: {customer.mobile}</p>
            </div>
            <div>
              <p style={{ margin: "5px 0" }}>Address: {customer.address[0].address1}</p>
              <div style={{ display: "flex"}}>
                <p style={{ margin:'0px 15px 0px 0px'}}>Post Code: {customer.address[0].postcode}</p>
                <p style={{ margin:'0px 15px 0px 0px'}}>State: {customer.address[0].state}</p>
                <p style={{margin:'0px 15px 0px 0px'}}>City: {customer.address[0].city}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex'}}>
            <button id={index} style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              marginRight: '8px',
              fontWeight: 'bold'
            }}
            onClick={deleteCustomerFromList}
            >
              Delete
            </button>
            <button style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Edit
            </button>
          </div>
        </div>
      </div>
      
      ))}
    </>
  );
};

export default Main;
