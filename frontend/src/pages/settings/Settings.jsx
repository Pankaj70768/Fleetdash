import "./Settings.css";
import Layout from "../../components/layout/Layout";
import { FaCog, FaUserShield, FaBell, FaPalette } from "react-icons/fa";

function Settings() {

    return (

        <Layout>

        <div className="page-container">

            <div className="page-head">

                <div>
                    <h1>Settings</h1>
                    <p className="page-sub">Manage your profile, notifications and application preferences</p>
                </div>

            </div>

            <div className="settings-grid">

                <div className="page-card settings-card">
                    <div className="settings-card-icon"><FaUserShield /></div>
                    <h2>Account</h2>
                    <p>Manage your login details, password and account security from the Profile page.</p>
                </div>

                <div className="page-card settings-card">
                    <div className="settings-card-icon"><FaBell /></div>
                    <h2>Notifications</h2>
                    <p>Control which fleet alerts and reports you get notified about.</p>
                </div>

                <div className="page-card settings-card">
                    <div className="settings-card-icon"><FaPalette /></div>
                    <h2>Preferences</h2>
                    <p>Customize how the dashboard looks and behaves for your workflow.</p>
                </div>

                <div className="page-card settings-card">
                    <div className="settings-card-icon"><FaCog /></div>
                    <h2>General</h2>
                    <p>Application-wide options for units, time zone and defaults.</p>
                </div>

            </div>

        </div>

        </Layout>

    );

}

export default Settings;
