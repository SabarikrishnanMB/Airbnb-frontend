import axios from "axios";
import { React, useEffect, useState, useContext } from "react";
import env from "../../settings";

function ChennaiRoom(roomId) {
  const data = roomId;

  const [rooms, setRooms] = useState([]);
   return (
    <>
      <div>
        <h2>{data}</h2>
      </div>
    </>
  );
}

export default ChennaiRoom;
