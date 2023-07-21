import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContext } from "./context/ChatContext";
import { Timestamp } from "firebase/firestore"; // Import the Timestamp from Firestore

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const [timestamp, setTimestamp] = useState("just now"); // State to hold the timestamp

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    // Calculate the time difference and update the timestamp
    const messageTimestamp = message.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const currentTime = new Date();
    const timeDifference = currentTime - messageTimestamp;
    const secondsAgo = Math.floor(timeDifference / 1000);

    if (secondsAgo < 60) {
      setTimestamp("just now");
    } else if (secondsAgo < 3600) {
      setTimestamp(`${Math.floor(secondsAgo / 60)} minutes ago`);
    } else if (secondsAgo < 86400) {
      setTimestamp(`${Math.floor(secondsAgo / 3600)} hours ago`);
    } else {
      // Use a date formatting library like `date-fns` or `moment` for more precise formatting
      setTimestamp(messageTimestamp.toLocaleString()); // Fallback to displaying the full timestamp
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{timestamp}</span> {/* Display the calculated timestamp */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
