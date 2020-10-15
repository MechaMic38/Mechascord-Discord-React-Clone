import "./CreateServerModal.css";
import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../../Redux/userSlice";
import { setCSModalView } from "../../../Redux/appSlice";
import db, { storage } from "../../../firebase";
import { truncate } from "../../../utils/utils";
import { motion } from "framer-motion";
import { serverModel, userModel } from "../../../utils/dataModels";

function CreateServerModal({ isModalVisible }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [serverName, setServerName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const { userData, joinedServers, ownedServers } = user;
  const types = ["image/png", "image/jpeg", "image/gif"];

  /*============================================================
    Uploads the server image online, and then creates the server */
  const handleAddServer = (e) => {
    e.preventDefault();

    if (ownedServers.length >= 3) {
      alert("You have already created your maximum number of servers...");
      return;
    } else if (joinedServers.length >= 10) {
      alert("You have already joined your maximum number of servers...");
      return;
    }

    const serverRef = db.collection("servers").doc();
    const serverId = serverRef.id;

    const uploadServerImg = () => {
      const storageRef = storage.ref(`${serverId}/logo/${image.name}`);

      storageRef.put(image).on(
        "state_changed",
        (snap) => {},
        (err) => {
          setError(err);
        },
        async () => {
          await storageRef.getDownloadURL().then((url) => {
            createNewServer(url);
          });
        }
      );
    };

    const createNewServer = (url) => {
      if (url) {
        const serverRef = db.collection("servers").doc(serverId);

        serverRef.set(serverModel(serverName, url, userData));
        serverRef
          .get()
          .then((server) => {
            if (server.id) {
              const userServerRef = db
                .collection("servers")
                .doc(server.id)
                .collection("members")
                .doc(userData.uid);

              userServerRef
                .get()
                .then((doc) => {
                  if (!doc.exists) {
                    userServerRef.set(userModel(userData, "admin")).then(() => {
                      const userRef = db.collection("users").doc(userData.uid);
                      let serverList = [...joinedServers, server.id];
                      let ownedServerList = [...ownedServers, server.id];

                      userRef.update({
                        joinedServers: serverList,
                        ownedServers: ownedServerList,
                      });

                      dispatch(
                        updateUser({
                          ...user,
                          joinedServers: serverList,
                          ownedServers: ownedServerList,
                        })
                      );
                    });
                  }
                })
                .catch((err) => alert(err));
            }

            dispatch(
              setCSModalView({
                isCSModalVisible: false,
              })
            );
          })
          .catch((err) => alert(err));
      }
    };

    uploadServerImg();
  };

  /*============================================================
    Checks if the uploaded images is valid or not */
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImage(e.target.files[0]);
      setError(null);
    } else {
      setImage(null);
      setError("Please select an image file (JPEG / PNG / GIF)");
    }
  };

  /*============================================================
    Hides the Modal when clicking on the backdrop */
  const hideModal = (e) => {
    if (e.target.classList.contains("createServerModal")) {
      dispatch(
        setCSModalView({
          isCSModalVisible: false,
        })
      );
    }
  };

  return (
    <motion.div
      className="createServerModal"
      style={{ pointerEvents: isModalVisible ? "all" : "none" }}
      onClick={hideModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: isModalVisible ? 1 : 0 }}
    >
      <form>
        <h2 className="createServerModal__title">Create your Server</h2>
        <h6 className="createServerModal__subtitle">
          You can create up to 3 servers
        </h6>

        <div className="createServerModal__divider" />

        <p>Server Name</p>
        <input
          id="serverName"
          className="createServerModal__serverName"
          type="text"
          placeholder={`${userData.displayName}'s Server`}
          minLength={3}
          maxLength={30}
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />

        <p>Server Image</p>
        <label
          htmlFor="serverImg"
          className={`createServerModal__fileSelector ${
            error && "createServerModal__fileSelector--error"
          }`}
        >
          {!image && !error && <AddIcon />}
          {image && !error && <span>{truncate(image.name, 20)}</span>}
          {error && <span>{error}</span>}
        </label>
        <input
          id="serverImg"
          className="createServerModal__serverImg"
          type="file"
          onChange={handleChange}
        />

        <div className="createServerModal__divider" />

        <button
          type="submit"
          onClick={handleAddServer}
          disabled={!image || !serverName || !serverName.length > 30 || error}
        >
          Create New Server
        </button>
      </form>
    </motion.div>
  );
}

export default CreateServerModal;
