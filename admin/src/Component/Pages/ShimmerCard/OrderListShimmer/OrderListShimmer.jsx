import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderListShimmer() {
  return (
    <div style={{display:"flex" , background:"white",borderRadius:"10px", padding:"20px"}} >
      <div style={{display:"flex", flex:"2", width:"200px" }} >
        <Skeleton width={"150px"} height={"20px"}  count={2} />
      </div>
      <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" ,flex :"1"}} >
      <Skeleton width={"40px"} height={"40px"}   />
      </div>
    </div>
  );
}
