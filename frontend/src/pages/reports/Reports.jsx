import "./Reports.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";

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

        <Layout>

        <div className="page-container">

            <div className="page-head">

                <div>
                    <h1>Reports</h1>
                    <p className="page-sub">Generate and review fleet performance reports</p>
                </div>

                <span className="page-pill">
                    <FaFileAlt /> {reports.length} Generated
                </span>

            </div>

            <div className="panel">

            <h2 className="panel-title">
                <FaFileAlt /> Create Report
            </h2>

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

            </div>


            {reports.length === 0 ? (

                <div className="empty-state">
                    <FaClipboardList />
                    <p>No reports available. Create one above to get started.</p>
                </div>

            ) : (

                <div className="report-grid">

                    {reports.map((report) => (

                        <div
                            key={report._id}
                            className="report-item"
                        >

                            <div className="report-item-head">
                                <h3>{report.reportName}</h3>
                                <span className={`report-type ${report.reportType.toLowerCase()}`}>
                                    {report.reportType}
                                </span>
                            </div>

                            <p>
                                {report.description || "No description"}
                            </p>

                            <span className="report-date">
                                {new Date(report.createdAt).toLocaleString()}
                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

        </Layout>

    );

}

export default Reports;