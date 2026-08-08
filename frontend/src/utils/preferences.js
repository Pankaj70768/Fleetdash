// Lightweight local preferences store (no backend model exists for this
// yet, so it lives in localStorage). Settings.jsx writes these; Navbar.jsx
// and LiveMap.jsx read them.

const KEY = "fleetdash_preferences";

const defaults = {
    notifyInfo: true,
    notifyWarning: true,
    notifyCritical: true,
    speedUnit: "kmh", // "kmh" | "mph"
};

export const getPreferences = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(KEY));
        return { ...defaults, ...(stored || {}) };
    } catch {
        return { ...defaults };
    }
};

export const savePreferences = (prefs) => {
    localStorage.setItem(KEY, JSON.stringify(prefs));
    // Notify any listeners in this same tab (storage event only fires
    // for other tabs by default).
    window.dispatchEvent(new Event("preferences-updated"));
};

export const resetPreferences = () => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("preferences-updated"));
};

export const formatSpeed = (speedKmh, unit) => {
    if (speedKmh === undefined || speedKmh === null) return "-";
    if (unit === "mph") {
        return `${Math.round(speedKmh * 0.621371)} mph`;
    }
    return `${Math.round(speedKmh)} km/h`;
};

export default { getPreferences, savePreferences, resetPreferences, formatSpeed };
