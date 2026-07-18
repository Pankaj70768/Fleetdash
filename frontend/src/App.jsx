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
element={<Dashboard/>}
/>


<Route
path="/vehicles"
element={<Vehicles/>}
/>


<Route
path="/live-map"
element={<LiveMap/>}
/>


<Route
path="/alerts"
element={<Alerts/>}
/>


<Route
path="/reports"
element={<Reports/>}
/>


<Route
path="/settings"
element={<Settings/>}
/>

<Route
path="/profile"
element={<Profile/>}
/>


</Routes>

</BrowserRouter>

)

}


export default App;