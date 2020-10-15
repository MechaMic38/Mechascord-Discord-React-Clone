import "./SidebarServers.css";
import React, { useState, useEffect } from "react";

import SidebarServer from "./SidebarServer/SidebarServer";

import AddIcon from "@material-ui/icons/Add";
import ExploreIcon from "@material-ui/icons/Explore";

import db from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCSModalView, setFSModalView } from "../../../Redux/appSlice";
import { motion } from "framer-motion";
import { selectUser } from "../../../Redux/userSlice";
import { firestore } from "firebase";
import { Avatar } from "@material-ui/core";

function SidebarServers() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [servers, setServers] = useState([]);
  const { joinedServers } = user;

  /*============================================================
    Retrieves all created servers from the DB*/
  useEffect(() => {
    if (joinedServers.length > 0) {
      db.collection("servers")
        .where(firestore.FieldPath.documentId(), "in", joinedServers)
        .get()
        .then((querySnapshot) => {
          let serverList = [];

          querySnapshot.forEach(function (doc) {
            serverList.push({
              serverId: doc.id,
              serverName: doc.data().serverName,
              serverImg: doc.data().serverImg,
              serverOwner: doc.data().owner,
            });
          });

          setServers(serverList);
        });
    }
  }, [joinedServers]);

  return (
    <div id="serverList" className="sidebarServers">
      {servers.map(function (server) {
        const { serverId, serverName, serverImg, serverOwner } = server;
        return (
          <motion.div key={serverId} layout>
            <SidebarServer
              key={serverId}
              serverId={serverId}
              serverName={serverName}
              serverImg={serverImg}
              serverOwner={serverOwner}
            />
          </motion.div>
        );
      })}

      <div
        className="sidebarServers__addServer"
        onClick={() =>
          dispatch(
            setCSModalView({
              isCSModalVisible: true,
            })
          )
        }
      >
        <AddIcon />
      </div>

      <div
        className="sidebarServers__findServer"
        onClick={() =>
          dispatch(
            setFSModalView({
              isFSModalVisible: true,
            })
          )
        }
      >
        <ExploreIcon />
      </div>

      <a
        href="https://mechamic38.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebarServers__visitMe"
      >
        <Avatar
          src="https://avatars1.githubusercontent.com/u/69167202?s=460&u=f92c409b9b3020714d34c3aa56d3697b10d08204&v=4"
          alt="Pluda Michael (a.k.a. MechaMic_38)"
        />
      </a>
    </div>
  );
}

export default SidebarServers;
