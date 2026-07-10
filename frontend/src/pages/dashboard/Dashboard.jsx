import Card from "../../components/card/Card";
import "./Dashboard.css";
import Alerts from "../../components/alerts/Alerts";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";


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



<Table/>
<Alerts/>

</div>


</div>


</div>

)

}


export default Dashboard;