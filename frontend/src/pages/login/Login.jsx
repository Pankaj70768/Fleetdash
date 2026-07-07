import "./Login.css";
import Logo from "../../components/logo/Logo";
import { Link } from "react-router-dom";


function Login(){


return(

<div className="auth-page">


<div className="auth-card">


<Logo/>


<h2>
Welcome Back
</h2>


<p className="description">
Login to manage your fleet operations
</p>



<input
type="email"
placeholder="Email Address"
/>



<input
type="password"
placeholder="Password"
/>



<button>
Login
</button>



<div className="switch">

Don't have an account?

<Link to="/register">
    Register
</Link>

</div>


</div>


</div>


)

}


export default Login;