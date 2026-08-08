import "./LiveMap.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useSocket } from "../../context/SocketContext";
import { getPreferences, formatSpeed } from "../../utils/preferences";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Speed thresholds used to classify a vehicle's live status.
const IDLE_MAX = 1;      // km/h and below counts as parked/idle
const SPEEDING_MIN = 80; // km/h and above counts as speeding

const getStatus = (speed) => {
    if (speed === undefined || speed === null) return "unknown";
    if (speed <= IDLE_MAX) return "idle";
    if (speed >= SPEEDING_MIN) return "speeding";
    return "running";
};

const statusMeta = {
    idle: { label: "Idle", color: "#9CA3AF" },
    running: { label: "Running", color: "#22C55E" },
    speeding: { label: "Speeding", color: "#F87171" },
    unknown: { label: "Unknown", color: "#6B7280" },
};

// Builds a colored circular div-icon (no external image assets needed)
// so markers reflect the vehicle's live status at a glance.
const buildIcon = (status) => {
    const color = statusMeta[status].color;

    return L.divIcon({
        className: "fleet-marker",
        html: `
            <div class="fleet-marker-pulse" style="background:${color}22;"></div>
            <div class="fleet-marker-dot" style="background:${color}; border-color:${color};"></div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
    });
};

function LiveMap() {
    const socket = useSocket();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prefs, setPrefs] = useState(getPreferences());

    useEffect(() => {

        const syncPrefs = () => setPrefs(getPreferences());

        window.addEventListener("preferences-updated", syncPrefs);

        return () => window.removeEventListener("preferences-updated", syncPrefs);

    }, []);

    useEffect(() => {

        const fetchInitialLocations = async () => {

            try {

                const response = await api.get("/location");
                setLocations(response.data.data || []);

            } catch (error) {

                console.error("Failed to fetch locations:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchInitialLocations();

    }, []);

    useEffect(() => {

        const handleLocationUpdate = (newLocation) => {

            setLocations((currentLocations) => {

                const existingLocation = currentLocations.find(
                    (location) =>
                        location.vehicle?._id === newLocation.vehicle?._id
                );

                if (existingLocation) {

                    return currentLocations.map((location) =>
                        location.vehicle?._id === newLocation.vehicle?._id
                            ? newLocation
                            : location
                    );

                }

                return [...currentLocations, newLocation];

            });

        };

        socket.on("locationUpdated", handleLocationUpdate);

        return () => {
            socket.off("locationUpdated", handleLocationUpdate);
        };

    }, [socket]);

    const counts = locations.reduce((acc, location) => {
        const status = getStatus(location.speed);
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    if (loading) {

        return (
            <Layout>
                <div className="page-container">
                    <div className="page-head">
                        <div>
                            <h1>Live Map</h1>
                            <p className="page-sub">Loading vehicle locations...</p>
                        </div>
                    </div>
                    <div className="map-loading">
                        <div className="map-spinner" />
                    </div>
                </div>
            </Layout>
        );

    }


    return (

        <Layout>

        <div className="page-container">

            <div className="page-head">

                <div>
                    <h1>Live Map</h1>
                    <p className="page-sub">
                        Tracking {locations.length} vehicle location{locations.length === 1 ? "" : "s"} in real time
                    </p>
                </div>

                <span className="page-pill">
                    <FaMapMarkedAlt /> {locations.length} Active
                </span>

            </div>

            <div className="map-legend">

                <div className="legend-item">
                    <span className="legend-dot" style={{ background: statusMeta.running.color }} />
                    Running ({counts.running || 0})
                </div>

                <div className="legend-item">
                    <span className="legend-dot" style={{ background: statusMeta.idle.color }} />
                    Idle ({counts.idle || 0})
                </div>

                <div className="legend-item">
                    <span className="legend-dot" style={{ background: statusMeta.speeding.color }} />
                    Speeding ({counts.speeding || 0})
                </div>

            </div>

            <div className="map-panel">

            <MapContainer
                center={[16.3067, 80.4365]}
                zoom={7}
                className="fleet-map"
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {locations.map((location) => {

                    const status = getStatus(location.speed);
                    const vehicleNumber = location.vehicle?.vehicleNumber || "Vehicle";

                    return (

                        <Marker
                            key={location._id || location.vehicle?._id}
                            position={[
                                location.latitude,
                                location.longitude
                            ]}
                            icon={buildIcon(status)}
                        >

                            <Tooltip direction="top" offset={[0, -10]} permanent>
                                {vehicleNumber}
                            </Tooltip>

                            <Popup>

                                <div className="map-popup">

                                    <strong>{vehicleNumber}</strong>

                                    <span
                                        className={`popup-status ${status}`}
                                    >
                                        {statusMeta[status].label}
                                    </span>

                                    <p>Driver: {location.vehicle?.driverName || "Unknown"}</p>
                                    <p>Type: {location.vehicle?.vehicleType || "-"}</p>
                                    <p>Speed: {formatSpeed(location.speed, prefs.speedUnit)}</p>

                                </div>

                            </Popup>

                        </Marker>

                    );

                })}

            </MapContainer>

            </div>

        </div>

        </Layout>

    );

}

export default LiveMap;
