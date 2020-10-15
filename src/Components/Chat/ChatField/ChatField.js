import "./ChatField.css";
import React, { useState } from "react";

import Message from "./Message/Message";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import db from "../../../firebase";
import { motion } from "framer-motion";
import { messageModel } from "../../../utils/dataModels";

function ChatField({ messages, user, serverId, channelId, channelName }) {
  const [input, setInput] = useState("");

  /*============================================================
    Sends the message inside the selected chat room */
  const sendMessage = (e) => {
    e.preventDefault();

    if (input) {
      db.collection("servers")
        .doc(serverId)
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .add(messageModel(input, user));

      setInput("");
    }
  };

  return (
    <div className="chatField">
      <div id="messagesList" className="chatField__messages">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            <Message
              key={message.id}
              message={message.message}
              user={message.user}
              timestamp={message.timestamp}
            />
          </motion.div>
        ))}
      </div>

      <div className="chatField__input">
        <AddCircleIcon />
        <form>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={
              channelName
                ? `Send a message in #${channelName}`
                : `Select a Server and a Channel to start`
            }
            maxLength={2000}
          />
          <button
            className="chatField__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chatField__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default ChatField;
