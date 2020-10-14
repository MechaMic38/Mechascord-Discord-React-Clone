import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/userSlice';
import appReducer from '../Redux/appSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});
