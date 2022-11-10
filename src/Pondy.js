import { React, useEffect, useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import dataContext from "./ContextData";
import { DateRangePicker } from "react-date-range";
import { getMonth, getYear } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { env } from "./settings";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

function Pondy() {
  const history = useHistory();
  const data = useContext(dataContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const StartDate = `${data.startDate.toString()}-${data.month.toString()}-${data.year.toString()}`;
  const EndDate = `${data.endDate.toString()}-${data.month.toString()}-${data.year.toString()}`;
  const days = data.days;
  const [rooms, setRooms] = useState([]);
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

    const month = getMonth(ranges.selection.startDate) + 1;
    const year = getYear(ranges.selection.startDate);
    data.setMonth(month);
    data.setYear(year);
    data.setStartDate(d1);
    data.setEndDate(d2);
  }

  const getRooms = async () => {
    try {
      let results = await axios.get(`${env.api}/s/pondy`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setRooms([...results.data]);
      console.log(rooms);
    } catch (error) {
      console.log(error);
    }
  };


  const handleClick = async (id) => {
    try {
      history.push(`/rooms/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let totalPrice;
  return (
    <>
      {rooms.map((e, index) => (
        <div
          key={e._id}
          onClick={() => handleClick(e._id)}
          className="searchResults"
        >
          <img src={e.link} alt="img" className="room-img" key={"img"} />

          <div className="searchResults_text">
            <div className="searchResults_top_text">
              <h3>{e.hotelname}</h3>
              <h3>{e.location}</h3>
              <p>_____</p>
              <ReadMore>{e.desc}</ReadMore>
            </div>
            <div className="searchResults_bottom_text">
              <div className="searchResults_stars">
                <p>
                  <strong>{e.rating}</strong>
                </p>
                <StarIcon className="searchResults_star" />
              </div>
              <div className="searchResults_price">
                <h3>{e.price}/Night</h3>
                {/* { e.isbooked ? <h4>This room already booked</h4> :
                  <h4>
                    Total Price : {( totalPrice = data.days * e.price)} for{" "}
                    {data.days} days  
                  </h4>
                   
                  }
                  <div>
                  <DateRangePicker ranges={[selectionRange]} onChange={handleSelection} minDate={new Date()} />
                  </div> */}
              </div>
            </div>
          </div>

          <FavoriteBorderIcon className="searchResults_heart" />
        </div>
      ))}
    </>
  );
}

export default Pondy;
