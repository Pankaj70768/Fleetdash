import "./Drivers.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    const [driverName, setDriverName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [experience, setExperience] = useState("");
    const [status, setStatus] = useState("Available");


    const fetchDrivers = async () => {

        try {

            const response = await api.get("/drivers");

            setDrivers(response.data.data);

        } catch (error) {

            console.error("Failed to fetch drivers:", error);

        }

    };


    useEffect(() => {

        fetchDrivers();

    }, []);


    const handleAddDriver = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/drivers", {

                driverName,
                phoneNumber,
                licenseNumber,
                experience: Number(experience),
                status

            });

            setDrivers((currentDrivers) => [
                ...currentDrivers,
                response.data.data
            ]);

            setDriverName("");
            setPhoneNumber("");
            setLicenseNumber("");
            setExperience("");
            setStatus("Available");

            alert("Driver added successfully!");

        } catch (error) {

            console.error("Failed to add driver:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add driver"
            );

        }

    };


    return (

        <div className="page-container">

            <h1>Drivers</h1>

            <form onSubmit={handleAddDriver}>

                <input
                    type="text"
                    placeholder="Driver Name"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Experience (years)"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    min="0"
                    required
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="Leave">Leave</option>
                </select>

                <button type="submit">
                    Add Driver
                </button>

            </form>


            <table>

                <thead>

                    <tr>
                        <th>Driver</th>
                        <th>Phone</th>
                        <th>License</th>
                        <th>Experience</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {drivers.map((driver) => (

                        <tr key={driver._id}>

                            <td>{driver.driverName}</td>

                            <td>{driver.phoneNumber}</td>

                            <td>{driver.licenseNumber}</td>

                            <td>{driver.experience} years</td>

                            <td>{driver.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Drivers;