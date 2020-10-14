import "./Chat.css";
import React, { useEffect, useState } from "react";

import ChatHeader from "./ChatHeader/ChatHeader";
import ChatField from "./ChatField/ChatField";
import ChatUsers from "./ChatUsers/ChatUsers";

import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
  selectServerId,
} from "../../Redux/appSlice";
import { selectUser } from "../../Redux/userSlice";
import db from "../../firebase";

function Chat() {
  const user = useSelector(selectUser);
  const serverId = useSelector(selectServerId);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { userData } = user;

  /*============================================================
    Retrieves all messages of the selected chat room from the DB */
  useEffect(() => {
    if (channelId) {
      db.collection("servers")
        .doc(serverId)
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              message: doc.data().message,
              user: doc.data().user,
              timestamp: doc.data().timestamp,
            }))
          );
        });
    }

    if (!channelId) {
      setMessages([]);
    }
  }, [channelId]);

  /*============================================================
    Retrieves all users of the selected server from the DB */
  useEffect(() => {
    if (serverId) {
      db.collection("servers")
        .doc(serverId)
        .collection("members")
        .orderBy("joinedAt", "desc")
        .onSnapshot((snapshot) => {
          setMembers(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              user: doc.data().user,
              role: doc.data().role,
              joinedAt: doc.data().joinedAt,
            }))
          );
        });
    }

    if (!serverId) {
      setMembers([]);
    }
  }, [serverId]);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__section">
        <ChatField
          messages={messages}
          user={userData}
          serverId={serverId}
          channelId={channelId}
          channelName={channelName}
        />

        <ChatUsers members={members} />
      </div>
    </div>
  );
}

export default Chat;
