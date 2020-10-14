import "./Sidebar.css";
import React from "react";

import SidebarChannels from "./SidebarChannels/SidebarChannels";
import SidebarServers from "./SidebarServers/SidebarServers";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarServers />
      <SidebarChannels />
    </div>
  );
}

export default Sidebar;
