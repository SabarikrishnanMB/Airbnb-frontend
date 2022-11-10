import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import dataContext from "./ContextData";

function Header() {
  const myStorage = window.localStorage;
  const history = useHistory();
  const [location, setLocation] = useState("");
  const data = useContext(dataContext);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLogout = async (e) => {
    myStorage.removeItem("user");
    myStorage.removeItem("app_token");
    data.setcurrentUser();
    history.push("/");
  };
  data.setLoc(location);

  useEffect(() => {}, [myStorage.getItem("user")]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header">
              <Link to="/">
                <img className="header_icon" src="logo1.png" alt="logo"></img>
              </Link>

              <div className="header_right">
                <Link to="/host" className="host">
                  <p>Become a Host</p>
                </Link>

                {myStorage.getItem("user") ? (
                  <div className="buttons">
                    <button className="button_logout" onClick={handleLogout}>
                      Log out
                    </button>
                    <Link to="/roomsbooked">
                      <button className="button login">Your Bookings</button>
                    </Link>
                  </div>
                ) : (
                  <div className="buttons">
                    <Link to="/login">
                      <button className="button_login">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="button_register">Register</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
