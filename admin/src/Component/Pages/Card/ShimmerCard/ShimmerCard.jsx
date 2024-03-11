import React from 'react'
import "./shimmer.css"
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

export default function ShimmerCard() {
  return (
    <div className='shimmer-container' >   
      <div className='shimmer-name-div' >
      <Skeleton width={"190px"} height={"30px"} />
      </div>
      <div className='shimmer-image-container' >
        <div className='shimmer-img-div' >
        <Skeleton width={"130px"} height={"150px"} />
        </div>
        <div className='shimmer-price-container' >
          <div className='shimmer-price-div' >  <Skeleton width={"60px"} height={"30px"} /></div>
          <div className='shimmer-price-div  ' style={{marginTop:"15px"}} >  <Skeleton width={"60px"} height={"20px"} /></div>
          <div className='shimmer-button-div' > <Skeleton width={"60px"} height={"20px"} /> </div>
        </div>
      </div>
    </div>
  )
}
