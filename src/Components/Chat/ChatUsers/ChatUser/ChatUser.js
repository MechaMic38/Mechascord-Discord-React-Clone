import "./ChatUser.css";
import React from "react";

import { Avatar } from "@material-ui/core";

function ChatUser({ member }) {
  return (
    <div className="chatUser">
      <Avatar src={member.photoURL} alt={member.displayName} />
      <h4>{member.displayName}</h4>
    </div>
  );
}

export default ChatUser;
