import React, { useState } from 'react'
import "./orderListCard.css"

export default function OrderListCard( {order_id=123 , create_by="sampel" , price="120",isSelected, handleClick} ) {
    // const [isSelected , setIsSelected] = useState(false)
  return (
    <div className='ordercard-container'  onClick={handleClick}  >
        {isSelected &&<div className='order-selector' tabIndex="0" ></div>}
      <div className='ordercard-id-contianer' >
        <h2>Order_ID#{order_id}</h2>
        <p>{create_by}</p>
      </div>
      <div className='ordercard-orice-container' >
        <h3><i class="fa-solid fa-indian-rupee-sign"></i> {price}</h3>
      </div>
    </div>
  )
}
