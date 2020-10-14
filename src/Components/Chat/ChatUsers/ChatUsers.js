import "./ChatUsers.css";
import React from "react";

import ChatUser from "./ChatUser/ChatUser";

import { motion } from "framer-motion";

function ChatUsers({ members }) {
  const admins = members.filter(function (member) {
    return member.role === "admin";
  });
  const users = members.filter(function (member) {
    return member.role === "member";
  });

  return (
    <div id="usersList" className="chatUsers">
      {admins.length > 0 && (
        <div className="chatUsers__group">
          <h6>ADMIN--{admins.length}</h6>
          {admins.map(function (admin) {
            return (
              <motion.div
                key={admin.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ChatUser key={admin.id} member={admin.user} />
              </motion.div>
            );
          })}
        </div>
      )}

      {users.length > 0 && (
        <div className="chatUsers__group">
          <h6>USER--{users.length}</h6>
          {users.map(function (user) {
            return (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ChatUser key={user.id} member={user.user} />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChatUsers;
