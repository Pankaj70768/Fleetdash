import "./Alerts.css";

function Alerts() {

    const alerts = [

        {
            id: 1,
            type: "Overspeed",
            vehicle: "KA05CD9876",
            time: "2 mins ago",
            severity: "High"
        },

        {
            id: 2,
            type: "Maintenance Due",
            vehicle: "MH12AB1234",
            time: "Today",
            severity: "Medium"
        },

        {
            id: 3,
            type: "GPS Offline",
            vehicle: "TN10EF5555",
            time: "5 mins ago",
            severity: "High"
        }

    ];

    return (

        <div className="alerts-container">

            <h2>🚨 Recent Alerts</h2>

            {alerts.map((alert) => (

                <div className="alert-card" key={alert.id}>

                    <h3>{alert.type}</h3>

                    <p><strong>Vehicle:</strong> {alert.vehicle}</p>

                    <p><strong>Time:</strong> {alert.time}</p>

                    <span className={`severity ${alert.severity.toLowerCase()}`}>
                        {alert.severity}
                    </span>

                </div>

            ))}

        </div>

    );

}

export default Alerts;