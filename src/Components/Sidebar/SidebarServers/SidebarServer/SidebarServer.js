import "./SidebarServer.css";
import React from "react";

import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChannelInfo, setServerInfo } from "../../../../Redux/appSlice";
import { motion } from "framer-motion";

function SidebarServer({ serverId, serverName, serverImg, serverOwner }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="sidebarServer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <Avatar
        src={serverImg ? serverImg : ""}
        alt={serverName}
        onClick={() => {
          dispatch(
            setServerInfo({
              serverId,
              serverName,
              serverOwner,
            })
          );
          dispatch(
            setChannelInfo({
              channelId: null,
              channelName: null,
            })
          );
        }}
      />
    </motion.div>
  );
}

export default SidebarServer;
