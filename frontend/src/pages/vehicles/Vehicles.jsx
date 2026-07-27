import "./Vehicles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Vehicles() {

    const [search, setSearch] = useState("");
    const [vehicles, setVehicles] = useState([]);

    const [vehicleNumber, setVehicleNumber] = useState("");
    const [driverName, setDriverName] = useState("");
    const [vehicleType, setVehicleType] = useState("Truck");
    const [fuelType, setFuelType] = useState("Diesel");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState("Active");

    // Used to know whether we are adding or editing
    const [editingId, setEditingId] = useState(null);


    // =========================
    // GET ALL VEHICLES
    // =========================

    const fetchVehicles = async () => {

        try {

            const response = await api.get("/vehicles");

            setVehicles(response.data.data);

        } catch (error) {

            console.error("Failed to fetch vehicles:", error);

        }

    };


    useEffect(() => {

        fetchVehicles();

    }, []);


    // =========================
    // ADD OR UPDATE VEHICLE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const vehicleData = {
            vehicleNumber,
            driverName,
            vehicleType,
            fuelType,
            capacity: Number(capacity),
            status
        };

        try {

            // EDIT MODE
            if (editingId) {

                const response = await api.put(
                    `/vehicles/${editingId}`,
                    vehicleData
                );

                setVehicles((currentVehicles) =>
                    currentVehicles.map((vehicle) =>
                        vehicle._id === editingId
                            ? response.data.data
                            : vehicle
                    )
                );

                alert("Vehicle updated successfully!");

            }

            // ADD MODE
            else {

                const response = await api.post(
                    "/vehicles",
                    vehicleData
                );

                setVehicles((currentVehicles) => [
                    ...currentVehicles,
                    response.data.data
                ]);

                alert("Vehicle added successfully!");

            }


            // Clear form
            setVehicleNumber("");
            setDriverName("");
            setVehicleType("Truck");
            setFuelType("Diesel");
            setCapacity("");
            setStatus("Active");
            setEditingId(null);


        } catch (error) {

            console.error("Vehicle operation failed:", error);

            alert(
                error.response?.data?.message ||
                "Vehicle operation failed"
            );

        }

    };


    // =========================
    // EDIT VEHICLE
    // =========================

    const handleEditVehicle = (vehicle) => {

        setVehicleNumber(vehicle.vehicleNumber);
        setDriverName(vehicle.driverName);
        setVehicleType(vehicle.vehicleType);
        setFuelType(vehicle.fuelType);
        setCapacity(vehicle.capacity);
        setStatus(vehicle.status);

        setEditingId(vehicle._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // DELETE VEHICLE
    // =========================

    const handleDeleteVehicle = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this vehicle?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/vehicles/${id}`);

            setVehicles((currentVehicles) =>
                currentVehicles.filter(
                    (vehicle) => vehicle._id !== id
                )
            );

            alert("Vehicle deleted successfully!");

        } catch (error) {

            console.error("Failed to delete vehicle:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete vehicle"
            );

        }

    };


    // =========================
    // SEARCH
    // =========================

    const filteredVehicles = vehicles.filter((vehicle) =>

        vehicle.vehicleNumber
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        vehicle.driverName
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    return (

        <div className="page-container">

            <h1>Vehicles</h1>


            {/* ADD / EDIT FORM */}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) =>
                        setVehicleNumber(e.target.value)
                    }
                    required
                />


                <input
                    type="text"
                    placeholder="Driver Name"
                    value={driverName}
                    onChange={(e) =>
                        setDriverName(e.target.value)
                    }
                    required
                />


                <select
                    value={vehicleType}
                    onChange={(e) =>
                        setVehicleType(e.target.value)
                    }
                >

                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Car">Car</option>

                </select>


                <select
                    value={fuelType}
                    onChange={(e) =>
                        setFuelType(e.target.value)
                    }
                >

                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>

                </select>


                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) =>
                        setCapacity(e.target.value)
                    }
                    min="1"
                    required
                />


                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >

                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">
                        Maintenance
                    </option>

                </select>


                <button type="submit">

                    {editingId
                        ? "Update Vehicle"
                        : "Add Vehicle"}

                </button>

            </form>


            {/* SEARCH */}

            <input
                className="search"
                placeholder="Search vehicle or driver"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            {/* VEHICLE TABLE */}

            <table>

                <thead>

                    <tr>

                        <th>Vehicle No</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {filteredVehicles.map((vehicle) => (

                        <tr key={vehicle._id}>

                            <td>
                                {vehicle.vehicleNumber}
                            </td>

                            <td>
                                {vehicle.driverName}
                            </td>

                            <td>

                                <span className="status">
                                    {vehicle.status}
                                </span>

                            </td>


                            <td>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEditVehicle(vehicle)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteVehicle(
                                            vehicle._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Vehicles;