import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getPreferences } from "../../utils/preferences";


function Navbar(){

    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [openMenu, setOpenMenu] = useState(false);

    const [openNotifications, setOpenNotifications] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const [prefs, setPrefs] = useState(getPreferences());

    useEffect(() => {

        const syncPrefs = () => setPrefs(getPreferences());

        window.addEventListener("preferences-updated", syncPrefs);

        return () => window.removeEventListener("preferences-updated", syncPrefs);

    }, []);

    const typeToPrefKey = {
        Info: "notifyInfo",
        Warning: "notifyWarning",
        Critical: "notifyCritical",
    };

    const visibleNotifications = notifications.filter(
        (alert) => prefs[typeToPrefKey[alert.type]] !== false
    );



    useEffect(() => {


        const fetchProfile = async () => {

            try {

                const response = await api.get("/profile");

                setName(response.data.data.name);
                setRole(response.data.data.role);

            } catch(error){

                console.error(
                    "Failed to fetch profile:",
                    error
                );

            }

        };



        const fetchNotifications = async () => {

            try {

                const response = await api.get("/alerts");

                setNotifications(
                    response.data.data
                );

            } catch(error){

                console.error(
                    "Failed to fetch notifications:",
                    error
                );

            }

        };



        fetchProfile();

        fetchNotifications();


    }, []);





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



{/* Notification */}

<div className="notification-wrapper">


<div
className="notification"
onClick={() =>
    setOpenNotifications(!openNotifications)
}
>


<FaBell/>


<span>
{visibleNotifications.length}
</span>


</div>




{
openNotifications && (

<div className="notification-dropdown">


<h4>
Notifications
</h4>



{

visibleNotifications.length > 0 ? (


visibleNotifications.map((alert,index)=>(


<p key={index}>

{
alert.message ||
alert.title ||
"New Alert"
}

</p>


))


) : (


<p>
No new notifications
</p>


)

}



</div>

)

}



</div>







{/* Profile */}


<div className="profile-wrapper">


<div
className="profile"
onClick={() =>
    setOpenMenu(!openMenu)
}
>


<FaUserCircle/>


<div>

<h4>
{name || "User"}
</h4>


<p>
{role || "Role"}
</p>


</div>


</div>





{

openMenu && (


<div className="profile-dropdown">


<p
onClick={() =>
    navigate("/profile")
}
>
👤 My Profile
</p>



<p
onClick={() =>
    navigate("/settings")
}
>
⚙ Settings
</p>



<p
onClick={() => {
    localStorage.removeItem("token");
    navigate("/login");
}}
>
🚪 Logout
</p>



</div>


)

}



</div>





</div>



</div>


)


}



export default Navbar;