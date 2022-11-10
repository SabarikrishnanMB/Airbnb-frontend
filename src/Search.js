import React, { useContext, useState } from "react";
import "./search.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import dataContext from "./ContextData";
import { getMonth, getYear } from "date-fns";
import { useHistory } from "react-router-dom";

function Searchcomp() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const data = useContext(dataContext);
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelection(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    const d1 = ranges.selection.startDate.getDate();
    const d2 = ranges.selection.endDate.getDate();
    const days = d2 - d1 + 1;
    const month = getMonth(ranges.selection.startDate) + 1;
    const year = getYear(ranges.selection.startDate);
    data.setMonth(month);
    data.setYear(year);
    data.setDays(days);
    data.setStartDate(d1);
    data.setEndDate(d2);
  }

  function IncreaseAd() {
    const Incount = data.adults + 1;
    data.setAdults(Incount);
  }

  function DecreaseAd() {
    const Decount = data.adults - 1;
    data.setAdults(Decount);
  }

  function IncreaseKd() {
    const Incount = data.kids + 1;
    data.setKids(Incount);
  }
  function DecreaseKd() {
    const Decount = data.kids - 1;
    data.setKids(Decount);
  }
  return (
    <div className="search">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelection}
        minDate={new Date()}
      />

      <div className="search_guests">
        <h2>
          Number of Guests
          <PeopleIcon />
        </h2>
        <h4>
          Adults
          <span className="search_desc">
            <button
              onClick={() => DecreaseAd()}
              disabled={data.adults < 1}
              className="search-btn"
            >
              -
            </button>
            {data.adults}{" "}
            <button onClick={() => IncreaseAd()} className="search-btn">
              +
            </button>{" "}
            Ages 13 or above
          </span>
        </h4>
        <h4>
          Children
          <span className="search_desc">
            <button
              onClick={() => DecreaseKd()}
              disabled={data.kids < 1}
              className="search-btn"
            >
              -
            </button>
            {data.kids}{" "}
            <button onClick={() => IncreaseKd()} className="search-btn">
              +
            </button>{" "}
            Ages 2-12
          </span>
        </h4>
        <Button onClick={() => history.push("/search")}>Search Airbnb</Button>
      </div>
    </div>
  );
}

export default Searchcomp;
