import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import dataContext from "./ContextData";
import { env } from "./settings";

function RoomUpload() {
  const [hotelname, setHotelname] = useState();
  const [location, setLocation] = useState();
  const [desc, setDesc] = useState();
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState();
  const [link, Setlink] = useState();
  const [room, setRoom] = useState();
  const history = useHistory();
  const data = useContext(dataContext);

  const handlecreateroom = async () => {
    try {
      const postData = await axios.post(
        `${env.api}/create-room`,
        {
          hotelname: hotelname,
          location: location,
          desc: desc,
          rating: rating,
          price: price,
          link: link,
          isbooked: false,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      setRoom("");
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 500") {
        history.push("/login");
      } else {
        window.alert("Check your network connection");
      }
    }
  };

  return (
    <div className="row mt-3 ml-5">
      <div className="col-6">
        <label>Hotel Name</label>
        <input
          type="text"
          value={hotelname}
          onChange={(e) => setHotelname(e.target.value)}
          className="form-control"
        />
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
        />
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        />
        <label>Description</label>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Good reasons to stay @ your place"
          className="form-control"
          value={desc}
        />
        <label>Rating</label>
        <select
          className="form-control"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="form-group">
          <label>Image Link</label>
          <input
            type="text"
            value={link}
            className="form-control"
            onChange={(e) => Setlink(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-10">
            <button
              type="button"
              onClick={handlecreateroom}
              className="btn btn-primary"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomUpload;
