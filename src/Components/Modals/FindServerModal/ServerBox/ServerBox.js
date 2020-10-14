import "./ServerBox.css";
import React from "react";
import db from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../../../Redux/userSlice";
import { userModel } from "../../../../utils/dataModels";

function ServerBox({ server }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { userData, joinedServers } = user;
  const { serverId, serverName, serverImg } = server;

  const handleJoinServer = () => {
    const userRef = db.collection("users").doc(userData.uid);

    if (!joinedServers.includes(serverId)) {
      let serverList = [...joinedServers, serverId];
      userRef
        .update({
          joinedServers: serverList,
        })
        .then(() => {
          dispatch(
            updateUser({
              ...user,
              joinedServers: serverList,
            })
          );

          const userServerRef = db
            .collection("servers")
            .doc(serverId)
            .collection("members")
            .doc(userData.uid);

          userServerRef.get().then((doc) => {
            if (!doc.exists) {
              userServerRef.set(userModel(userData, "member"));
            } else {
              alert("User already exists in this Server!");
            }
          });
        });
    }
  };

  const alreadyJoined = () => {
    return joinedServers.includes(serverId);
  };

  return (
    <div className="serverBox">
      <div className="serverBox__imgContainer">
        <img src={serverImg} alt={serverName} />
      </div>

      <div className="serverBox__info">
        <h4 className="serverBox__name">{serverName}</h4>
        <button
          className={`serverBox__joinServer ${
            alreadyJoined() && "serverBox__joinServer--disabled"
          }`}
          onClick={handleJoinServer}
        >
          {alreadyJoined() ? "Joined" : "Join Server"}
        </button>
      </div>
    </div>
  );
}

export default ServerBox;
