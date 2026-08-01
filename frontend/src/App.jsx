import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";

import Vehicles from "./pages/vehicles/Vehicles";
import LiveMap from "./pages/map/LiveMap";
import Alerts from "./pages/alerts/Alerts";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Drivers from "./pages/drivers/Drivers";
import Trips from "./pages/trips/Trips";

function App(){

return(

<BrowserRouter>

<Routes>


<Route 
path="/" 
element={<Login/>}
/>


<Route 
path="/login" 
element={<Login/>}
/>


<Route 
path="/register" 
element={<Register/>}
/>


<Route
path="/dashboard"
element={
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
}
/>


<Route
path="/vehicles"
element={
    <ProtectedRoute>
        <Vehicles />
    </ProtectedRoute>
}
/>


<Route
path="/live-map"
element={
    <ProtectedRoute>
        <LiveMap />
    </ProtectedRoute>
}
/>


<Route
path="/alerts"
element={
    <ProtectedRoute>
        <Alerts />
    </ProtectedRoute>
}
/>


<Route
path="/reports"
element={
    <ProtectedRoute>
        <Reports />
    </ProtectedRoute>
}
/>


<Route
path="/settings"
element={
    <ProtectedRoute>
        <Settings />
    </ProtectedRoute>
}
/>

<Route
path="/profile"
element={
    <ProtectedRoute>
        <Profile />
    </ProtectedRoute>
}
/>

<Route
    path="/drivers"
    element={
        <ProtectedRoute>
            <Drivers />
        </ProtectedRoute>
    }
/>


<Route
    path="/trips"
    element={
        <ProtectedRoute>
            <Trips />
        </ProtectedRoute>
    }
/>
</Routes>

</BrowserRouter>

)

}


export default App;