import userSlice from "./userSlice";
import postSlice from "./postSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});

export default store;
