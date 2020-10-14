import "./CSS/App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import CreateServerModal from "./Components/Modals/CreateServerModal/CreateServerModal";
import FindServerModal from "./Components/Modals/FindServerModal/FindServerModal";

import { login, logout, selectUser } from "./Redux/userSlice";
import db, { auth } from "./firebase";
import { selectCSModalView, selectFSModalView } from "./Redux/appSlice";
import { userDBModel } from "./utils/dataModels";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isCSModalVisible = useSelector(selectCSModalView);
  const isFSModalVisible = useSelector(selectFSModalView);

  /*============================================================
    Checks if user is already authenticated or not
    Also checks if user has already been insterted into DB, if
    not, adds it in*/
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        let user = {
          uid: authUser.uid,
          photoURL: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        };

        let userRef = db.collection("users").doc(authUser.uid);

        userRef.get().then((doc) => {
          if (!doc.exists) {
            userRef.set(userDBModel(user));
            userRef.get().then((doc) => {
              dispatch(
                login({
                  userData: doc.data().user,
                  joinedServers: doc.data().joinedServers,
                })
              );
            });
          } else {
            dispatch(
              login({
                userData: doc.data().user,
                joinedServers: doc.data().joinedServers,
              })
            );
          }
        });
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
          <CreateServerModal isModalVisible={isCSModalVisible} />
          <FindServerModal isModalVisible={isFSModalVisible} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
