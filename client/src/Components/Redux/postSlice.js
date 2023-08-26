import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPost: [],
    isLoading: false,
    isError: false,
  },

  reducers: {
    allData(state, action) {
      return {
        ...state,
        allPost: action.payload,
        isLoading: false,
        isError: false,
      };
    },
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setIsError(state, action) {
      return {
        ...state,
        isError: action.payload,
      };
    },
  },
});

export const { allData, setIsLoading, setIsError } = postSlice.actions;
export default postSlice.reducer;

export const fetchAllPost = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    let res = await axios.get("https://eight6-agency.onrender.com/posts", {
      headers: { authorization: localStorage.getItem("token") },
    });

    dispatch(allData(res.data));
  } catch (err) {
    dispatch(setIsError());
    console.log(err);
  }
};
