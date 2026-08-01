import "./Alerts.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { FaBell, FaCheckCircle } from "react-icons/fa";

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

        <Layout>

        <div className="page-container">

            <div className="page-head">

                <div>
                    <h1>Alerts</h1>
                    <p className="page-sub">Stay on top of fleet issues that need your attention</p>
                </div>

                <span className="page-pill">
                    <FaBell /> {alerts.length} Active
                </span>

            </div>

            {alerts.length === 0 ? (

                <div className="empty-state">
                    <FaCheckCircle />
                    <p>All clear — no active alerts right now.</p>
                </div>

            ) : (

                <div className="alerts-list">

                    {alerts.map((alert) => (

                        <div
                            className="alert-entry"
                            key={alert._id}
                        >

                            <div className={`alert-marker ${alert.type.toLowerCase()}`} />

                            <div className="alert-body">

                                <div className="alert-body-head">
                                    <h3>{alert.title}</h3>
                                    <span className={`alert-badge ${alert.type.toLowerCase()}`}>
                                        {alert.type}
                                    </span>
                                </div>

                                <p>{alert.message}</p>

                                <span className="alert-time">
                                    {new Date(alert.createdAt).toLocaleString()}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

        </Layout>

    );

}

export default Alerts;
