import { configureStore } from "@reduxjs/toolkit";
import posts from "./PostSlice";
import AuthSlice from "./AuthSlice";


const store = configureStore({
    reducer:{
        posts,
        AuthSlice,
    },
});

export default store;