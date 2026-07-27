import "./Alerts.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Alerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        const fetchAlerts = async () => {

            try {

                const response = await api.get("/alerts");

                setAlerts(response.data.data);

            } catch (error) {

                console.error("Failed to fetch alerts:", error);

            }

        };

        fetchAlerts();

    }, []);


    return (

        <div className="alerts-container">

            <h2>🚨 Fleet Alerts</h2>

            <p>{alerts.length} Active</p>

            {alerts.length === 0 && (
                <p>No alerts found.</p>
            )}

            {alerts.map((alert) => (

                <div
                    className="alert-card"
                    key={alert._id}
                >

                    <h3>{alert.title}</h3>

                    <p>
                        <strong>Message:</strong> {alert.message}
                    </p>

                    <p>
                        <strong>Time:</strong>{" "}
                        {new Date(alert.createdAt).toLocaleString()}
                    </p>

                    <span
                        className={`severity ${alert.type.toLowerCase()}`}
                    >
                        {alert.type}
                    </span>

                </div>

            ))}

        </div>

    );

}

export default Alerts;