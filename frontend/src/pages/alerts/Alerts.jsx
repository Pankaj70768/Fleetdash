import "./Alerts.css";
import { useState } from "react";


function Alerts(){


const [alerts,setAlerts] = useState([

{
type:"Critical",
vehicle:"MH12AB1234",
message:"Engine temperature is high",
time:"5 minutes ago"
},

{
type:"Warning",
vehicle:"KA05CD9876",
message:"Vehicle has been idle for long time",
time:"20 minutes ago"
},

{
type:"Info",
vehicle:"TN10EF5555",
message:"Maintenance scheduled",
time:"1 hour ago"
}

]);



return(

<div className="alerts-container">


<div className="alerts-header">


<h2>
Fleet Alerts
</h2>


<span>
{alerts.length} Active
</span>


</div>




{
alerts.length === 0 ?


(
<div className="empty-message">

No alerts available

</div>
)


:

(

<div className="alerts-list">


{
alerts.map((alert,index)=>(


<div 
className="alert-item"
key={index}
>



<div>


<h3>
{alert.vehicle}
</h3>


<p>
{alert.message}
</p>


</div>





<div className="alert-right">


<span 
className={`alert-type ${alert.type.toLowerCase()}`}
>

{alert.type}

</span>



<small>
{alert.time}
</small>



</div>




</div>


))

}


</div>

)


}



</div>

)


}


export default Alerts;