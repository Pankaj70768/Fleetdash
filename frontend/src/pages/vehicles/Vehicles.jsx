import "./Vehicles.css";
import { useState } from "react";


function Vehicles() {

const [search,setSearch]=useState("");


const vehicles=[

{
number:"KA01AB1234",
driver:"Rahul",
status:"Active"
},

{
number:"KA02CD5678",
driver:"Arjun",
status:"Maintenance"
},

{
number:"KA03EF9012",
driver:"Priya",
status:"Available"
}

];


const filteredVehicles=vehicles.filter((vehicle)=>

vehicle.number.toLowerCase().includes(search.toLowerCase())
||
vehicle.driver.toLowerCase().includes(search.toLowerCase())

);



return(

<div className="page-container">

<h1>Vehicles</h1>


<input

className="search"

placeholder="Search vehicle or driver"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


<table>

<thead>

<tr>

<th>Vehicle No</th>
<th>Driver</th>
<th>Status</th>

</tr>

</thead>


<tbody>


{
filteredVehicles.map((vehicle,index)=>(

<tr key={index}>

<td>{vehicle.number}</td>

<td>{vehicle.driver}</td>

<td>

<span className="status">

{vehicle.status}

</span>

</td>


</tr>


))

}


</tbody>


</table>


</div>


)

}


export default Vehicles;