import React from 'react'
import "./taskcard.css"

export default function TaskCard({task_id="00350",task_created="12/06/2023",task_amount="230"}) {
  return (
    <div className='task-card-container' >
        <div className='task-left-container' >
            <div className='task-id-container' > <p>Task #{task_id}</p> </div>
            <div className='task-date-contianer' > <p>{task_created}</p> </div>
        </div>
        <div className='task-right-container' > 
           <p><i class="fa-solid fa-indian-rupee-sign"></i>{task_amount}</p>
         </div>
    </div>
  )
}
