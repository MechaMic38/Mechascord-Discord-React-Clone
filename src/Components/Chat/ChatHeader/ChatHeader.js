import "./ChatHeader.css";
import React from "react";

import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InboxRoundedIcon from "@material-ui/icons/InboxRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

import { truncate } from "../../../utils/utils";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">{channelName && "#"}</span>
          {truncate(channelName, 50)}
        </h3>
      </div>

      <div className="chatHeader__right">
        <NotificationsRoundedIcon />
        <EditLocationRoundedIcon />
        <PeopleAltRoundedIcon />

        <div className="chatHeader__search">
          <input placeholder="Search" />
          <SearchRoundedIcon />
        </div>

        <InboxRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
