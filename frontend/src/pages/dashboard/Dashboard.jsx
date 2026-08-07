import Card from "../../components/card/Card";
import "./Dashboard.css";
import Alerts from "../../components/alerts/Alerts";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import API from "../../services/api";



function Dashboard(){
    const [dashboardData, setDashboardData] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    maintenanceVehicles: 0,
    totalDrivers: 0,
    availableDrivers: 0,
    driversOnTrip: 0
});

useEffect(() => {

    const fetchDashboard = async () => {

        try {

            const response = await API.get("/dashboard");

            setDashboardData(response.data.dashboard);

        } catch (error) {

            console.error("Dashboard API Error:", error);

        }

    };

    fetchDashboard();

}, []);

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
value={dashboardData.totalVehicles}
/>


<Card
title="Active Vehicles"
value={dashboardData.activeVehicles}
/>


<Card
title="Maintenance Vehicles"
value={dashboardData.maintenanceVehicles}
/>


<Card
title="Total Drivers"
value={dashboardData.totalDrivers}
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