import { Button } from "@mui/material";
import React, { useState } from "react";
import "./banner.css";
import Searchcomp from "./Search";
import { useHistory } from "react-router-dom";

function Banner(props) {
  const history = useHistory();
  const [showDate, setShowDate] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner">              
              <div className="banner_text">
                <h1>Go Out and Explore the World!</h1>
                <h5>
                  Plan a different type of getaway to uncover the Hidden Gems
                  around you.
                </h5>

                <Button
                  variant="outlined"
                  onClick={() => history.push("/search")}
                >
                  Explore Nearby
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
