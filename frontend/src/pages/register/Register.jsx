import "./Register.css";
import Logo from "../../components/logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";


function Register() {


  const navigate = useNavigate();



  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",

  });



  const [errors, setErrors] = useState({});


  const [serverError, setServerError] = useState("");


  const [loading, setLoading] = useState(false);




  const handleChange = (e) => {


    const { name, value } = e.target;



    if (name === "name") {


      const onlyLetters = value.replace(/[^A-Za-z ]/g, "");


      setFormData({

        ...formData,

        name: onlyLetters,

      });


    }



   


    else {


      setFormData({

        ...formData,

        [name]: value,

      });


    }


  };





  const validate = () => {


    let newErrors = {};



    if(formData.name.trim()===""){

      newErrors.name="Name is required.";

    }



    if(formData.email.trim()===""){

      newErrors.email="Email is required.";

    }



    else if(
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ){

      newErrors.email="Enter a valid email address.";

    }





    






    if(formData.password.trim()===""){

      newErrors.password="Password is required.";

    }



    setErrors(newErrors);



    return Object.keys(newErrors).length===0;


  };







  const handleSubmit = async(e)=>{


    e.preventDefault();



    if(!validate()) return;




    try{


      setLoading(true);

      setServerError("");



      await API.post("/auth/register", formData);




      alert("Registration Successful!");



      navigate("/login");



    }



    catch(error){



      setServerError(

        error.response?.data?.message ||

        "Registration failed. Try again."

      );


    }



    finally{


      setLoading(false);


    }


  };





return (

<div className="auth-page">


<div className="auth-card">


<Logo />


<h2>Create Account</h2>


<p className="description">

Join FleetDash to manage vehicles efficiently

</p>



<form onSubmit={handleSubmit}>


<input

type="text"

placeholder="Full Name"

name="name"

value={formData.name}

onChange={handleChange}

/>


{errors.name && <p className="error">{errors.name}</p>}




<input

type="email"

placeholder="Email Address"

name="email"

value={formData.email}

onChange={handleChange}

/>


{errors.email && <p className="error">{errors.email}</p>}










<input

type="password"

placeholder="Create Password"

name="password"

value={formData.password}

onChange={handleChange}

/>


{errors.password && <p className="error">{errors.password}</p>}





{serverError && (

<p className="error">

{serverError}

</p>

)}




<button type="submit">


{

loading

?

"Creating Account..."

:

"Create Account"

}


</button>



</form>




<div className="switch">

Already registered?


<Link to="/login">

Login

</Link>


</div>



</div>


</div>


);


}


export default Register;