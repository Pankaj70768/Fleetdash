import Card from "../../components/card/Card";
import "./Dashboard.css";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";


function Dashboard(){

return(

<div className="dashboard">


<Sidebar/>


<div className="main">


<Navbar/>


<div className="content">


<h1>
FleetDash Dashboard
</h1>


<div className="cards">


<Card
title="Total Vehicles"
value="120"
/>


<Card
title="Active Vehicles"
value="95"
/>


<Card
title="Idle Vehicles"
value="15"
/>


<Card
title="Alerts"
value="10"
/>


</div>



</div>


</div>


</div>

)

}


export default Dashboard;