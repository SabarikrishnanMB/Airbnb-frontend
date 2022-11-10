import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import dataContext from "./ContextData";
import "./bookedRooms.css";
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

function BookedRooms() {
  const data = useContext(dataContext);
  const [rooms, setRooms] = useState([]);
  const [loadedContent, setLoadedContent] = useState(false);

  const getBookedRoom = async () => {
    setLoadedContent(false);
    try {
      let roomBook = await axios.get(`${env.api}/roomsbooked`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });

      setRooms([...roomBook.data]);
      console.log(rooms);
      if (rooms.length != 0) {
        setLoadedContent(true);
        console.log(loadedContent);
      } else {
        setLoadedContent(false);
        console.log(loadedContent);
      }
    } catch (error) {
      console.log(error);
      setLoadedContent(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${env.api}/delete-room/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      getBookedRoom();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getBookedRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms.length]);
  let totalPrice;
  return (
    <>
      {loadedContent ? (
        <div>
          {rooms.map((e, index) => (
            <div key={e._id} className="searchResults">
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
                    <h3>{e.price}/night</h3>
                    <h4>
                      Total Price : {(totalPrice = e.days * e.price)} for{" "}
                      {e.days} days
                    </h4>
                  </div>
                  <div className="searchResults_edit">
                    <button
                      className="cancel_btn"
                      onClick={() => handleDelete(e._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <FavoriteBorderIcon className="searchResults_heart" />
            </div>
          ))}
        </div>
      ) : (
        <div className="noBookings">
          <div className="jumbotron">
            <h2>You have no current bookings!!</h2>
            <Link to="/search">
              <button className="btn btn-primary btn-lg">
                Search for rooms!
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default BookedRooms;
