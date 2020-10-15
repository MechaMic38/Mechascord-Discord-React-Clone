import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    serverId: null,
    serverName: null,
    serverOwner: null,
    channelId: null,
    channelName: null,
    isCSModalVisible: false, //Create Server Modal
    isFSModalVisible: false, //Find Server Modal
  },
  reducers: {
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
      state.serverOwner = action.payload.serverOwner;
    },
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    setCSModalView: (state, action) => {
      state.isCSModalVisible = action.payload.isCSModalVisible;
    },
    setFSModalView: (state, action) => {
      state.isFSModalVisible = action.payload.isFSModalVisible;
    },
  },
});

export const {
  setServerInfo,
  setChannelInfo,
  setCSModalView,
  setFSModalView,
} = appSlice.actions;

export const selectServerId = (state) => state.app.serverId;
export const selectServerName = (state) => state.app.serverName;
export const selectServerOwner = (state) => state.app.serverOwner;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectCSModalView = (state) => state.app.isCSModalVisible;
export const selectFSModalView = (state) => state.app.isFSModalVisible;

export default appSlice.reducer;
