import { configureStore } from "@reduxjs/toolkit";
import openCommenSectionReducer from '../slices/CommentSectionSlice'

export default configureStore({
    reducer: {
        isCsOpen: openCommenSectionReducer,
    }
});