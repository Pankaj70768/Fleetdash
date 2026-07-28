import "./Trips.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Trips() {

    const [trips, setTrips] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [vehicle, setVehicle] = useState("");
    const [driver, setDriver] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [status, setStatus] = useState("Scheduled");


    const fetchData = async () => {

        try {

            const [tripResponse, vehicleResponse, driverResponse] =
                await Promise.all([
                    api.get("/trips"),
                    api.get("/vehicles"),
                    api.get("/drivers")
                ]);

            setTrips(tripResponse.data.data);
            setVehicles(vehicleResponse.data.data);
            setDrivers(driverResponse.data.data);

        } catch (error) {

            console.error("Failed to fetch trip data:", error);

        }

    };


    useEffect(() => {

        fetchData();

    }, []);


    const handleCreateTrip = async (e) => {

        e.preventDefault();

        try {

            await api.post("/trips", {
                vehicle,
                driver,
                source,
                destination,
                tripDate,
                status
            });

            alert("Trip created successfully!");

            setVehicle("");
            setDriver("");
            setSource("");
            setDestination("");
            setTripDate("");
            setStatus("Scheduled");

            fetchData();

        } catch (error) {

            console.error("Failed to create trip:", error);

            alert(
                error.response?.data?.message ||
                "Failed to create trip"
            );

        }

    };


    return (

        <div className="page-container">

            <h1>Trips</h1>

            <form onSubmit={handleCreateTrip}>

                <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    required
                >
                    <option value="">Select Vehicle</option>

                    {vehicles
                        .filter((item) => item.status === "Active")
                        .map((item) => (

                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.vehicleNumber}
                            </option>

                        ))}

                </select>


                <select
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    required
                >
                    <option value="">Select Driver</option>

                    {drivers
                        .filter((item) => item.status === "Available")
                        .map((item) => (

                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.driverName}
                            </option>

                        ))}

                </select>


                <input
                    type="text"
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                />


                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />


                <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    required
                />


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>


                <button type="submit">
                    Create Trip
                </button>

            </form>


            <table>

                <thead>

                    <tr>
                        <th>Vehicle</th>
                        <th>Driver</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>

                </thead>


                <tbody>

                    {trips.map((trip) => (

                        <tr key={trip._id}>

                            <td>
                                {trip.vehicle?.vehicleNumber || "N/A"}
                            </td>

                            <td>
                                {trip.driver?.driverName || "N/A"}
                            </td>

                            <td>{trip.source}</td>

                            <td>{trip.destination}</td>

                            <td>
                                {new Date(trip.tripDate).toLocaleDateString()}
                            </td>

                            <td>{trip.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Trips;