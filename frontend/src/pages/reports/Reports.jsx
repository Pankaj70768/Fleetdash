import "./Reports.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Reports() {

    const [reports, setReports] = useState([]);
    const [reportName, setReportName] = useState("");
    const [reportType, setReportType] = useState("Trip");
    const [description, setDescription] = useState("");

    const fetchReports = async () => {

        try {

            const response = await api.get("/reports");

            setReports(response.data.data);

        } catch (error) {

            console.error("Failed to fetch reports:", error);

        }

    };


    useEffect(() => {

        fetchReports();

    }, []);


    const handleCreateReport = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/reports", {
                reportName,
                reportType,
                description
            });

            setReports((currentReports) => [
                response.data.data,
                ...currentReports
            ]);

            setReportName("");
            setReportType("Trip");
            setDescription("");

            alert("Report created successfully!");

        } catch (error) {

            console.error("Failed to create report:", error);

            alert(
                error.response?.data?.message ||
                "Failed to create report"
            );

        }

    };


    return (

        <div className="page-container">

            <h1>Reports</h1>

            <form onSubmit={handleCreateReport}>

                <input
                    type="text"
                    placeholder="Report Name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    required
                />

                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <option value="Trip">Trip</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Driver">Driver</option>
                </select>

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    Create Report
                </button>

            </form>


            <div className="page-card">

                <h2>Generated Reports: {reports.length}</h2>

                {reports.length === 0 ? (

                    <p>No reports available.</p>

                ) : (

                    reports.map((report) => (

                        <div
                            key={report._id}
                            className="report-item"
                        >

                            <h3>{report.reportName}</h3>

                            <p>
                                <strong>Type:</strong> {report.reportType}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {report.description || "No description"}
                            </p>

                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(report.createdAt).toLocaleString()}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Reports;