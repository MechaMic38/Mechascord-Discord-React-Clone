import "./SidebarChannels.css";
import React, { useEffect, useState } from "react";

import SidebarChannel from "./SidebarChannel/SidebarChannel";
import OptionMenu from "../OptionMenus/OptionMenu";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import { Avatar } from "@material-ui/core";
import db, { auth } from "../../../firebase";
import { selectUser } from "../../../Redux/userSlice";
import { useSelector } from "react-redux";
import { selectServerId, selectServerName } from "../../../Redux/appSlice";
import { truncate } from "../../../utils/utils";
import { motion } from "framer-motion";
import { channelModel } from "../../../utils/dataModels";

function SidebarChannels() {
  const user = useSelector(selectUser);
  const serverId = useSelector(selectServerId);
  const serverName = useSelector(selectServerName);

  const [channels, setChannels] = useState([]);
  const [optionMenuVisible, setOptionMenuVisible] = useState(false);

  const { userData } = user;

  /*============================================================
    Retrieves all channels of the selected server from the DB */
  useEffect(() => {
    if (serverId) {
      db.collection("servers")
        .doc(serverId)
        .collection("channels")
        .onSnapshot((snapshot) => {
          setChannels(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              channel: doc.data(),
            }))
          );
        });
    }
  }, [serverId]);

  /*============================================================
    Adds a channel to channels list */
  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("servers")
        .doc(serverId)
        .collection("channels")
        .add(channelModel(channelName));
    }
  };

  /*============================================================
    Opens Option Menu */
  const toggleOptionMenu = () => {
    if (serverId) setOptionMenuVisible(!optionMenuVisible);
  };

  return (
    <div className="sidebarChannels">
      <div className="sidebarChannels__server">
        <h3>{serverName && truncate(serverName, 25)}</h3>
        <motion.div
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: optionMenuVisible ? -180 : 0 }}
        >
          <ExpandMoreIcon onClick={toggleOptionMenu} />
        </motion.div>

        <OptionMenu optionMenuVisible={optionMenuVisible} />
      </div>

      <div id="channelsList" className="sidebarChannels__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon
            onClick={serverId && handleAddChannel}
            className="sidebar__addChannel"
          />
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />

        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={userData.photoURL} />

        <div className="sidebar__profileInfo">
          <h3>{userData.displayName}</h3>
          {userData.uid && <p>#{userData.uid.substring(0, 5)}</p>}
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default SidebarChannels;
