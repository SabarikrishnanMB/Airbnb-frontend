import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";
import * as Yup from "yup";
import Textfield from "./Textfield";
import { Formik, Form } from "formik";
import env from "./settings";

function Register() {
  const history = useHistory();
  const validate = Yup.object({
    username: Yup.string()
      .min(5, "Username must be atleast 5 Characters")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must Match")
      .required("Enter Confirm password"),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const postData = async (data) => {
    setLoading(true);
    try {
      let Data = await axios.post(`${env.api}/register`, data);
      window.alert("User Registered Successfully");
      setLoading(false);
      setFailure(false);
      setSuccess(true);
      history.push("/login");
    } catch (error) {
      setLoading(false);
      setFailure(true);
      if (error.message === "Request failed with status code 400") {
        window.alert(
          "E-mail is already registered.Please use different email ID!"
        );
        console.log(error);
      } else {
        window.alert("Check your Network");
        console.log(error);
      }
    }
  };
  return (
    <>
      {loading ? (
        <h2>Loading......</h2>
      ) : (
        <div className="signup__page">
          <div className="signup__container">
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                let data = {
                  email: values.email,
                  username: values.username,
                  password: values.password,
                };
                postData(data);
                setLoading(true);
              }}
            >
              {(formik) => (
                <div className="signup__title">
                  <div className="signup__inner">
                    <Form>
                      <div className="left">
                        <Textfield
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter your e-mail ID"
                        />
                        <Textfield
                          label="Username"
                          name="username"
                          type="text"
                          placeholder="Enter your Username"
                        />
                        <Textfield
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Enter your Password"
                        />
                        <Textfield
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your Password"
                        />
                      </div>
                      <button className="signup__buttons" type="submit">
                        Register
                      </button>
                    </Form>
                    {success && (
                      <span className="success">
                        Successfull. You can log in now!
                      </span>
                    )}
                    {failure && (
                      <span className="failure">
                        Something went wrong try again!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
