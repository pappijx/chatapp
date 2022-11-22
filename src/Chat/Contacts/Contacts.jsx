import React, { useEffect } from "react";
import "./Contacts.css";

function Contacts({ user, active, setChatroom }) {
  const { firstname, lastname } = user?.user;
  console.log(user);
  useEffect(() => {
    // console.log(user, active, chatId);
    return () => {};
  }, [active]);
  return (
    <div
      className={`contactCard ${active ? "active" : ""}`}
      onClick={() => setChatroom(user)}
    >
      <span className="img">
        {firstname ? firstname.charAt(0) + lastname?.charAt(0) : "NA"}
      </span>
      <div className="details">
        <span className="name">{firstname + " " + lastname}</span>
        <small className="status">active</small>
      </div>
    </div>
  );
}

export default Contacts;
