import { configureStore } from "@reduxjs/toolkit";
import commenSectionReducer from '../slices/CommentSectionSlice'
import modalShortReducer from '../slices/ModalShortSlice'

export default configureStore({
    reducer: {
        commentSection: commenSectionReducer,
        modalShort: modalShortReducer,
    }
});