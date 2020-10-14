import "./OptionMenu.css";
import React from "react";

import AddIcon from "@material-ui/icons/Add";

import { motion } from "framer-motion";

function OptionMenu({ optionMenuVisible }) {
  return (
    <motion.div
      className="sidebarChannels__serverOptions"
      initial={{ scale: 0, translateX: "-50%" }}
      animate={{ scale: optionMenuVisible ? 1 : 0, translateX: "-50%" }}
    >
      <motion.div
        className="serverOptions__option"
        whileHover={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          color: "white",
        }}
      >
        <h5>Create New Category</h5>
        <AddIcon />
      </motion.div>
    </motion.div>
  );
}

export default OptionMenu;
