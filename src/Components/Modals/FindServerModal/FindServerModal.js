import "./FindServerModal.css";
import React, { useEffect, useState } from "react";

import ServerBox from "./ServerBox/ServerBox";
import db from "../../../firebase";
import { motion } from "framer-motion";
import { setFSModalView } from "../../../Redux/appSlice";
import { useDispatch } from "react-redux";

function FindServerModal({ isModalVisible }) {
  const dispatch = useDispatch();
  const [servers, setServers] = useState([]);

  /*============================================================
    Retrieves all created servers from the DB*/
  useEffect(() => {
    db.collection("servers").onSnapshot((snapshot) => {
      setServers(
        snapshot.docs.map((doc) => ({
          serverId: doc.id,
          serverName: doc.data().serverName,
          serverImg: doc.data().serverImg,
          serverOwner: doc.data().owner,
        }))
      );
    });
  }, []);

  /*============================================================
    Hides the Modal when clicking on the backdrop */
  const hideModal = (e) => {
    if (e.target.classList.contains("findServerModal")) {
      dispatch(
        setFSModalView({
          isFSModalVisible: false,
        })
      );
    }
  };

  return (
    <motion.div
      className="findServerModal"
      style={{ pointerEvents: isModalVisible ? "all" : "none" }}
      onClick={hideModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: isModalVisible ? 1 : 0 }}
    >
      <div className="findServerModal__container">
        <h2 className="findServerModal__title">Find a Server</h2>

        <div id="serverWrapper" className="findServerModal__wrapper">
          {servers.map(function (server) {
            return (
              <motion.div key={server.serverId} layout>
                <ServerBox key={server.serverId} server={server} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default FindServerModal;
