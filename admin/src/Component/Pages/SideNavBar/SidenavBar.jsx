import React from "react";
import "./sideNavBar.css";
import {useSelector} from "react-redux"

export default function SidenavBar() {

//  const userProfile = useSelector()

  return (
    <div className="side-nav-container">
      <div className="user-profile-container">
        <div className="user-img-div">
        <i class="fa-solid fa-user fa-2xl"></i>  
        </div>
        
      </div>
      <div className="Task-list-contianer">
        <i class="fa-solid fa-clipboard fa-xl"></i>
      </div>
      <div className="update-inv-container">
        <i class="fa-regular fa-pen-to-square fa-xl"></i>
      </div>

      <div className="setting-contianer">
        <i class="fa-solid fa-gear fa-xl "></i>
      </div>
    </div>
  );
}
