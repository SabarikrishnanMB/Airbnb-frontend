import { React, useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import dataContext from "../ContextData";
import { DateRangePicker } from "react-date-range";
import { getMonth, getYear } from "date-fns";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { env } from "../settings";

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

function RoomDetails() {
  const { id } = useParams();
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
    const days = d2 - d1 + 1;
    const month = getMonth(ranges.selection.startDate) + 1;
    const year = getYear(ranges.selection.startDate);
    data.setMonth(month);
    data.setYear(year);
    data.setDays(days);
    data.setStartDate(d1);
    data.setEndDate(d2);
  }

  const handleId = async (id, StartDate, EndDate, days) => {
    try {
      displayRazorPay();
      history.push("/roomsbooked");
      let roombook = await axios.get(
        `${env.api}/booked-rooms/${id}/${StartDate}/${EndDate}/${days}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleRoomInfo = async (id) => {
    try {
      const RoomData = await axios.get(`${env.api}/rooms/${id}`, { id });
      setRooms([...RoomData.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleRoomInfo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //--------------Payment Gateway-----------//
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // const __DEV__ = document.domain === `http://localhost:3001/rooms/${id}`;
  // console.log(__DEV__)
  async function displayRazorPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load,Check your Connection.");
      return;
    }

    const data = await axios.post(
      `https://airbnb-backend-nodejs.herokuapp.com/rooms/${id}`,
      { totalPrice, id }
    );

    console.log(data.data);

    const options = {
      key: process.env.REACT_RAZOR_KEY, // Enter the Key ID generated from the Dashboard
      amount: totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.data.currency,
      name: "Airbnb Room Payment",
      description: "Thank You",
      image: "https://example.com/your_logo",
      order_id: data.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Madhava Raman",
        email: "madhava.raman@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "address",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  let totalPrice;
  const user = window.localStorage.getItem("user");

  // const toDo = async () => {
  //     displayRazorPay();
  //     handleConfirmation();
  // }
  return (
    <>
      {user === null ? (
        <div
          className="guest_login"
          style={{
            color: "red",
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Please Login Before Checking Out !
        </div>
      ) : (
        <>
          {rooms.map((e, index) => (
            <div className="roomPage">
              <div className="roomPage__left">
                <div className="roomDetails">
                  <h2>Room Details</h2>
                  <img
                    src={e.link}
                    alt="img"
                    className="room-img"
                    key={"img"}
                  />
                  <h3>{e.hotelname}</h3>
                  <h3>{e.location}</h3>
                  <ReadMore>{e.desc}</ReadMore>
                </div>
              </div>
              <div className="roomPage__right">
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelection}
                  minDate={new Date()}
                />
                <h4>
                  Total Price : {(totalPrice = data.days * e.price)} for{" "}
                  {data.days} days
                </h4>
                <button
                  disabled={e.isbooked}
                  onClick={() => handleId(e._id, StartDate, EndDate, days)}
                  className="confirmBook"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default RoomDetails;
