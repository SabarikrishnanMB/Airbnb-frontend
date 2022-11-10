import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import env from "./settings";
import dataContext from "./ContextData";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

function EditBooking() {
  const data = useContext(dataContext);
  const [startdate, setStartDate] = useState(data.startdate); //Date Picker
  const [enddate, setEndDate] = useState(data.enddate);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          startdate={startdate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default EditBooking;
