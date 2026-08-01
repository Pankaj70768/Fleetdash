import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";


function Navbar(){

return(

<div className="navbar">


<div className="nav-left">

<h3>
Fleet Operations
</h3>

<p>
Manage your fleet performance and activities
</p>

</div>



<div className="nav-right">


<div className="notification">

<FaBell/>

<span>
3
</span>

</div>



<div className="profile">


<FaUserCircle/>


<div>

<h4>
Admin
</h4>

<p>
Fleet Manager
</p>

</div>


</div>


</div>


</div>

)

}


export default Navbar;