import "./LiveMap.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { FaMapMarkedAlt } from "react-icons/fa";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});


function LiveMap() {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchLocations = async () => {

            try {

                const response = await api.get("/location");

                setLocations(response.data.data);

            } catch (error) {

                console.error(
                    "Failed to fetch locations:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchLocations();

    }, []);


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


                {locations.map((location) => (

                    <Marker
                        key={location._id}
                        position={[
                            location.latitude,
                            location.longitude
                        ]}
                    >

                        <Popup>

                            <strong>
                                {location.vehicle?.vehicleNumber ||
                                    "Vehicle"}
                            </strong>

                            <br />

                            Driver:{" "}
                            {location.vehicle?.driverName ||
                                "Unknown"}

                            <br />

                            Speed: {location.speed} km/h

                        </Popup>

                    </Marker>

                ))}

            </MapContainer>

            </div>

        </div>

        </Layout>

    );

}

export default LiveMap;