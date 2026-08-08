import "./Settings.css";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import { FaCog, FaUserShield, FaBell, FaPalette } from "react-icons/fa";
import { getPreferences, savePreferences, resetPreferences } from "../../utils/preferences";

function Settings() {

    const [prefs, setPrefs] = useState(getPreferences());

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        savePreferences(prefs);
    }, [prefs]);

    const toggle = (key) => {
        setPrefs((current) => ({ ...current, [key]: !current[key] }));
    };

    const setUnit = (unit) => {
        setPrefs((current) => ({ ...current, speedUnit: unit }));
    };

    const handleReset = () => {
        resetPreferences();
        setPrefs(getPreferences());
    };

    const handleChangePassword = async (e) => {

        e.preventDefault();
        setPasswordMessage("");
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        try {

            setSavingPassword(true);

            await api.put("/profile/password", {
                currentPassword,
                newPassword,
            });

            setPasswordMessage("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            setPasswordError(
                error.response?.data?.message ||
                "Failed to update password."
            );

        } finally {

            setSavingPassword(false);

        }

    };

    return (

        <Layout>

        <div className="page-container">

            <div className="page-head">

                <div>
                    <h1>Settings</h1>
                    <p className="page-sub">Manage your profile, notifications and application preferences</p>
                </div>

            </div>

            {/* ACCOUNT / SECURITY */}

            <div className="panel">

                <h2 className="panel-title">
                    <FaUserShield /> Account Security
                </h2>

                <form onSubmit={handleChangePassword} className="settings-form">

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={6}
                        required
                    />

                    <button type="submit" disabled={savingPassword}>
                        {savingPassword ? "Updating..." : "Change Password"}
                    </button>

                </form>

                {passwordMessage && <p className="settings-success">{passwordMessage}</p>}
                {passwordError && <p className="settings-error">{passwordError}</p>}

            </div>

            {/* NOTIFICATIONS */}

            <div className="panel">

                <h2 className="panel-title">
                    <FaBell /> Notifications
                </h2>

                <p className="page-sub" style={{ marginBottom: 18 }}>
                    Choose which alert types appear in your notification bell.
                </p>

                <div className="toggle-row">
                    <div>
                        <strong>Info Alerts</strong>
                        <p>Routine updates like trip starts and completions.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={prefs.notifyInfo}
                            onChange={() => toggle("notifyInfo")}
                        />
                        <span className="slider" />
                    </label>
                </div>

                <div className="toggle-row">
                    <div>
                        <strong>Warning Alerts</strong>
                        <p>Speeding, delays, and other non-critical issues.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={prefs.notifyWarning}
                            onChange={() => toggle("notifyWarning")}
                        />
                        <span className="slider" />
                    </label>
                </div>

                <div className="toggle-row">
                    <div>
                        <strong>Critical Alerts</strong>
                        <p>Maintenance and safety issues that need action.</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={prefs.notifyCritical}
                            onChange={() => toggle("notifyCritical")}
                        />
                        <span className="slider" />
                    </label>
                </div>

            </div>

            {/* PREFERENCES */}

            <div className="panel">

                <h2 className="panel-title">
                    <FaPalette /> Preferences
                </h2>

                <p className="page-sub" style={{ marginBottom: 18 }}>
                    Speed unit used on the Live Map and vehicle details.
                </p>

                <div className="unit-toggle">
                    <button
                        type="button"
                        className={prefs.speedUnit === "kmh" ? "unit-active" : ""}
                        onClick={() => setUnit("kmh")}
                    >
                        km/h
                    </button>
                    <button
                        type="button"
                        className={prefs.speedUnit === "mph" ? "unit-active" : ""}
                        onClick={() => setUnit("mph")}
                    >
                        mph
                    </button>
                </div>

            </div>

            {/* GENERAL */}

            <div className="panel">

                <h2 className="panel-title">
                    <FaCog /> General
                </h2>

                <p className="page-sub" style={{ marginBottom: 18 }}>
                    Restore notification and unit preferences to their defaults.
                </p>

                <button type="button" className="reset-btn" onClick={handleReset}>
                    Reset to Defaults
                </button>

            </div>

        </div>

        </Layout>

    );

}

export default Settings;
