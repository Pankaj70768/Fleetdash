import { useState } from "react";
import "./Table.css";

function Table() {
    const [search, setSearch] = useState("");
    const vehicles = [
        {
            id: "MH12AB1234",
            driver: "John",
            status: "Active",
            speed: "62 km/h",
            location: "Bangalore"
        },

        {
            id: "KA05CD9876",
            driver: "Rahul",
            status: "Idle",
            speed: "0 km/h",
            location: "Mysore"
        },

        {
            id: "TN10EF5555",
            driver: "Priya",
            status: "Maintenance",
            speed: "-",
            location: "Chennai"
        }
        
    ];
    const filteredVehicles = vehicles.filter((vehicle)=>
        vehicle.id.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.status.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(search.toLowerCase())
);

    return (

        <div className="table-container">

            <h2>Recent Vehicles</h2>
            <input
    className="search-box"
    type="text"
    placeholder="Search vehicle..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>

            <table>

                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Speed</th>
                        <th>Location</th>
                    </tr>
                </thead>


                <tbody>

                    {filteredVehicles.map((vehicle, index) => (

                        <tr key={index}>

                            <td>{vehicle.id}</td>
                            <td>{vehicle.driver}</td>
                            <td>

                            <span className={`status ${vehicle.status.toLowerCase()}`}>
                                    {vehicle.status}
                             </span>

                            </td>
                            <td>{vehicle.speed}</td>
                            <td>{vehicle.location}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
    

}


export default Table;