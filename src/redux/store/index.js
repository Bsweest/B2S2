import { configureStore } from "@reduxjs/toolkit";
import commenSectionReducer from '../slices/CommentSectionSlice'
import SearchDetailsReducer from "../slices/SearchDetailsSlice";

export default configureStore({
    reducer: {
        commentSection: commenSectionReducer,
        searchDetails: SearchDetailsReducer,
    }
});