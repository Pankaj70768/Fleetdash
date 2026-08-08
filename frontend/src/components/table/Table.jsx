import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Table.css";

function Table() {
    const [search, setSearch] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchVehicles = async () => {

            try {

                const response = await api.get("/vehicles");
                setVehicles(response.data.data || []);

            } catch (error) {

                console.error("Failed to fetch vehicles:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchVehicles();

    }, []);

    const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.driverName?.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.status?.toLowerCase().includes(search.toLowerCase())
    );

    return (

    <div className="table-container">

<div className="table-header">

<h2>
Vehicle Monitoring
</h2>


<input
className="search-box"
type="text"
placeholder="Search vehicle..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


</div>

            {loading ? (

                <p className="table-status">Loading vehicles...</p>

            ) : filteredVehicles.length === 0 ? (

                <p className="table-status">No vehicles found.</p>

            ) : (

            <table>

                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>


                <tbody>

                    {filteredVehicles.map((vehicle) => (

                        <tr key={vehicle._id}>

                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.driverName}</td>
                            <td>{vehicle.vehicleType}</td>
                            <td>

                            <span className={`status ${vehicle.status.toLowerCase().replace(" ", "-")}`}>
                                    {vehicle.status}
                             </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            )}

        </div>

    );
    

}


export default Table;