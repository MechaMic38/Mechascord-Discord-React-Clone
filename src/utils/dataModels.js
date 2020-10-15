import firebase from "firebase";

// SERVER Model to be updated to Firestore
export const serverModel = (
  serverName,
  serverImg,
  owner,
  createdAt = firebase.firestore.FieldValue.serverTimestamp()
) => {
  return {
    serverName,
    serverImg,
    owner,
    createdAt,
  };
};

// USER Model to be updated to Firestore
export const userModel = (
  user,
  role,
  joinedAt = firebase.firestore.FieldValue.serverTimestamp()
) => {
  return {
    user,
    role,
    joinedAt,
  };
};

// USER Model to be updated to Firestore
export const userDBModel = (
  user,
  createdAt = firebase.firestore.FieldValue.serverTimestamp(),
  joinedServers = [],
  ownedServers = []
) => {
  return {
    user,
    createdAt,
    joinedServers,
    ownedServers,
  };
};

// Channel Model to be updated to Firestore
export const channelModel = (channelName) => {
  return {
    channelName,
  };
};

// MESSAGE Model to be updated to Firestore
export const messageModel = (
  message,
  user,
  timestamp = firebase.firestore.FieldValue.serverTimestamp()
) => {
  return {
    message,
    user,
    timestamp,
  };
};
