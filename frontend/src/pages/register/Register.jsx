import "./Register.css";
import Logo from "../../components/logo/Logo";
import { Link } from "react-router-dom";


function Register(){


return(

<div className="auth-page">


<div className="auth-card">


<Logo/>


<h2>
Create Account
</h2>


<p className="description">
Join FleetDash to manage vehicles efficiently
</p>



<input
placeholder="Full Name"
/>



<input
type="email"
placeholder="Email Address"
/>



<input
placeholder="Mobile Number"
/>



<input
type="password"
placeholder="Create Password"
/>



<button>
Create Account
</button>



<div className="switch">

Already registered?


<Link to="/login">
    Login
</Link>


</div>


</div>


</div>


)

}


export default Register;