import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";


function Sidebar() {

const navigate = useNavigate();


const logout = () => {

  localStorage.removeItem("token");

  navigate("/login");

};


return (

<div className="sidebar">


<div className="brand">

<h2>🚛 FleetDash</h2>

<p>Fleet Operations</p>

</div>



<div className="menu">


<NavLink to="/dashboard">
Dashboard
</NavLink>


<NavLink to="/vehicles">
Vehicles
</NavLink>


<NavLink to="/live-map">
Live Map
</NavLink>


<NavLink to="/alerts">
Alerts
</NavLink>


<NavLink to="/reports">
Reports
</NavLink>


<NavLink to="/settings">
Settings
</NavLink>


<NavLink to="/profile">
Profile
</NavLink>



<button 
className="logout-btn"
onClick={logout}
>
Logout
</button>



</div>


</div>

);

}


export default Sidebar;