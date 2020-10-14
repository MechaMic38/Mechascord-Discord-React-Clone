import "./Message.css";
import React from "react";

import { Avatar } from "@material-ui/core";

function Message({ message, user, timestamp }) {
  return (
    <div className="message">
      <Avatar src={user.photoURL} />

      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
