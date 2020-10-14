import "./SidebarChannel.css";
import React from "react";

import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../../../Redux/appSlice";
import { truncate } from "../../../../utils/utils";

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() => {
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        );
      }}
    >
      <h5>
        <span className="sidebarChannel__hash">#</span>
        {truncate(channelName, 30)}
      </h5>
    </div>
  );
}

export default SidebarChannel;
