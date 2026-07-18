import "./Login.css";
import Logo from "../../components/logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../services/api";


function Login() {


  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });


  const [errors, setErrors] = useState({});


  const [serverError, setServerError] = useState("");


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });


  };




  const validate = () => {


    let newErrors = {};



    if (formData.email.trim() === "") {


      newErrors.email = "Email is required.";


    }


    else if (

      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)

    ) {


      newErrors.email = "Enter a valid email address.";


    }




    if (formData.password.trim() === "") {


      newErrors.password = "Password is required.";


    }


    else if (

      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(formData.password)

    ) {


      newErrors.password =
        "Password must contain 8+ characters, uppercase, lowercase, number and special character.";


    }



    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;


  };





  const handleSubmit = async (e) => {


    e.preventDefault();



    if (!validate()) return;



    try {


      setLoading(true);

      setServerError("");



      const response = await API.post("/login", formData);



      localStorage.setItem(

        "token",

        response.data.token

      );



      navigate("/dashboard");



    }


    catch(error) {


      setServerError(

        error.response?.data?.message ||

        "Invalid email or password"

      );


    }


    finally {


      setLoading(false);


    }


  };




  return (


    <div className="auth-page">


      <div className="auth-card">


        <Logo />



        <h2>

          Welcome Back

        </h2>



        <p className="description">

          Login to manage your fleet operations

        </p>




        <form onSubmit={handleSubmit}>



          <input

            type="email"

            placeholder="Email Address"

            name="email"

            value={formData.email}

            onChange={handleChange}

          />



          {errors.email && (

            <p className="error">

              {errors.email}

            </p>

          )}







          <input

            type="password"

            placeholder="Password"

            name="password"

            value={formData.password}

            onChange={handleChange}

          />



          {errors.password && (

            <p className="error">

              {errors.password}

            </p>

          )}






          {serverError && (

            <p className="error">

              {serverError}

            </p>

          )}






          <button type="submit">


            {

              loading

              ?

              "Logging in..."

              :

              "Login"

            }


          </button>



        </form>





        <div className="switch">


          Don't have an account?



          <Link to="/register">

            Register

          </Link>



        </div>



      </div>


    </div>


  );


}


export default Login;