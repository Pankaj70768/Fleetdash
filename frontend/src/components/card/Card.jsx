import "./Card.css";
import { FaCar } from "react-icons/fa";


function Card({title,value}){


return(

<div className="stat-card">


<div className="card-icon">

<FaCar/>

</div>


<h3>
{title}
</h3>


<p>
{value}
</p>


<span>
Updated today
</span>


</div>

)

}


export default Card;