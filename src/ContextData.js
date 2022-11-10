import React, { useState } from "react";

let DataContext = React.createContext();
export default DataContext;

export const DataProvider = ({ children }) => {
  const [days, setDays] = useState([]);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [loc, setLoc] = useState("");
  const [chennaiRooms, setChennaiRooms] = useState([]);
  const [ootyRooms, setOotyRooms] = useState([]);
  const [pondyRooms, setPondyRooms] = useState([]);
  const [currentUser, setcurrentUser] = useState(
    window.localStorage.getItem("user")
  );

  return (
    <DataContext.Provider
      value={{
        days,
        setDays,
        adults,
        setAdults,
        kids,
        setKids,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        month,
        setMonth,
        year,
        setYear,
        loc,
        setLoc,
        currentUser,
        setcurrentUser,
        chennaiRooms,
        setChennaiRooms,
        ootyRooms,
        setOotyRooms,
        pondyRooms,
        setPondyRooms,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
