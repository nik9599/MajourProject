import React, { useEffect, useState } from 'react'
import { getRequest } from '../../../API/API'
import "./orderListCard.css"

export default function OrderListCard( {order_id=123 , token ,  create_by =1 , price="120",isSelected, handleClick} ) {
    // const [isSelected , setIsSelected] = useState(false)
    const [username , setUserName] = useState({
      username : ""
    })
    useEffect(()=>{
      const getUserById = async () => {
        const resp = await getRequest(null, `/getUserById/${create_by}`, token);
        console.log(token);
        if (resp.success) {
          setUserName({
            username: resp.data[0].username,
          });
        }
      };
      getUserById()
    },[])

  return (
    <div className='ordercard-container'  onClick={handleClick}  >
        {isSelected &&<div className='order-selector' tabIndex="0" ></div>}
      <div className='ordercard-id-contianer' >
        <h2>Order_ID#{order_id}</h2>
        <p>{username.username}</p>
      </div>
      <div className='ordercard-orice-container' >
        <h3><i class="fa-solid fa-indian-rupee-sign"></i> {price}</h3>
      </div>
    </div>
  )
}
