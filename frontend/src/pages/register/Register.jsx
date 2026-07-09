import "./Register.css";
import Logo from "../../components/logo/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Allow only alphabets and spaces
      const onlyLetters = value.replace(/[^A-Za-z ]/g, "");
      setFormData({
        ...formData,
        name: onlyLetters,
      });
    }

    else if (name === "phone") {
      // Allow only digits and max 10
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setFormData({
        ...formData,
        phone: onlyNumbers,
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

    // Name
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets are allowed.";
    }

    // Email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Phone
    if (formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Password
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain 8+ characters, uppercase, lowercase, number and special character.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Registration Successful!");
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

          {errors.name && (
            <p className="error">{errors.name}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

          <input
            type="text"
            placeholder="Mobile Number"
            name="phone"
            value={formData.phone}
            maxLength={10}
            onChange={handleChange}
          />

          {errors.phone && (
            <p className="error">{errors.phone}</p>
          )}

          <input
            type="password"
            placeholder="Create Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="error">{errors.password}</p>
          )}

          <button type="submit">
            Create Account
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