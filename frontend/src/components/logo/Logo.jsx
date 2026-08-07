import "./Logo.css";
import { FaTruckFast } from "react-icons/fa6";


function Logo(){

return(

<div className="fleet-logo">

    <div className="fleet-icon">
        <FaTruckFast/>
    </div>


    <div className="fleet-brand">

        <h1>
            FleetDash
        </h1>

        <p>
            Fleet Management System
        </p>

    </div>


</div>

)

}


export default Logo;