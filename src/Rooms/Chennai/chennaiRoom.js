import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import env from "../../settings";

function ChennaiRoom(roomId) {
  const data = roomId;

  const [rooms, setRooms] = useState([]);
  // const getRoom = async () => {
  //     try {

  //         let roomData = await axios.get(`${env.api}/rooms/:id`,{
  //             headers : {
  //               "Authorization" : window.localStorage.getItem("app_token")
  //             }
  //           })
  //           setRooms([...roomData.data])
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  // useEffect(() => {
  //     getRoom();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <>
      <div>
        <h2>{data}</h2>
      </div>
    </>
  );
}

export default ChennaiRoom;
