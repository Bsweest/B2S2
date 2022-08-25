import { configureStore } from "@reduxjs/toolkit";
import commenSectionReducer from '../slices/CommentSectionSlice'
import SearchDetailsReducer from "../slices/SearchDetailsSlice";
import messagesReducer from "../slices/MessagesSlice";

export default configureStore({
    reducer: {
        commentSection: commenSectionReducer,
        searchDetails: SearchDetailsReducer,
        messages: messagesReducer,
    }
});