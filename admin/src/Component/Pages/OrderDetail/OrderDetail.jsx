import React from 'react'
import "./orderdetail.css"
import PaymentCard from '../Card/PaymentCard/PaymentCard'


export default function OrderDetail({created_by="sample" , contact_no="9599094256"}) {
  return (
    <div className='orderdetail-container' >
      <div className='orderId-container' >
        <div> <h2>Order ID#{}</h2> </div>
        <div> <p>{created_by}</p>  <p>{contact_no}</p> </div>
      </div>
      <div className='order-item-container' >
      <div className="header-container">
        <div className="name-div">
          {" "}
          <p>Product Name</p>
        </div>
        <div className="quantity-div">
          {" "}
          <p>Product Quantity</p>
        </div>
        <div className="price-div">
          {" "}
          <p>Product Price</p>
        </div>
        <div className="total-div">
          {" "}
          <p>Total</p>
        </div>
      </div>
      <div className='card-detail-container' >
        <PaymentCard/>
        </div>
      </div>
      <div className='order-completed-container' > <button>Completed</button> </div>
    </div>
  )
}
