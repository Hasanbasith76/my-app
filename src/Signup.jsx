import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.css";

export default function Signup() {
  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    number: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const [isActive, setIsActive] = React.useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const formikSignup = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      alert("Account created successfully.")
      console.log("Signup Data:", values);
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      alert("Login Successful.")
      console.log("Login Data:", values);
    },
  });

  return (
    <div className="whole">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className={`form-container sign-up ${isActive ? "" : "hidden"}`}>
          <form onSubmit={formikSignup.handleSubmit}>
            <h1 className="header">Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              value={formikSignup.values.name}
            />
            {formikSignup.touched.name && formikSignup.errors.name && (
              <div className="error">{formikSignup.errors.name}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              value={formikSignup.values.email}
            />
            {formikSignup.touched.email && formikSignup.errors.email && (
              <div className="error">{formikSignup.errors.email}</div>
            )}

            <input
              type="tel"
              name="number"
              pattern="[0-9]{10}"
              placeholder="Number"
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              value={formikSignup.values.number}
            />
            {formikSignup.touched.number && formikSignup.errors.number && (
              <div className="error">{formikSignup.errors.number}</div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              value={formikSignup.values.password}
            />
            {formikSignup.touched.password && formikSignup.errors.password && (
              <div className="error">{formikSignup.errors.password}</div>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formikSignup.handleChange}
              onBlur={formikSignup.handleBlur}
              value={formikSignup.values.confirmPassword}
            />
            {formikSignup.touched.confirmPassword &&
              formikSignup.errors.confirmPassword && (
                <div className="error">
                  {formikSignup.errors.confirmPassword}
                </div>
              )}

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className={`form-container sign-in ${isActive ? "hidden" : ""}`}>
          <form onSubmit={formikLogin.handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
            />
            {formikLogin.touched.email && formikLogin.errors.email && (
              <div className="error">{formikLogin.errors.email}</div>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.password}
            />
            {formikLogin.touched.password && formikLogin.errors.password && (
              <div className="error">{formikLogin.errors.password}</div>
            )}

            <a href="#">Forgot Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter the personal details to use all of site features</p>
              <button onClick={handleLoginClick}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, User!</h1>
              <p>Register with personal details to use all of site features</p>
              <button onClick={handleRegisterClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
