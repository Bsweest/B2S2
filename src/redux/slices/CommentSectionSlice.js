import { createSlice } from "@reduxjs/toolkit";

const openCommentSection = createSlice({
    name: 'isCsOpen',
    initialState: {
        isOpen: false,
        data: null,
    },
    reducers: {
        openCS: (state, action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        closeCS: (state) => {
            state.isOpen = false;
            state.data = null;
        }
    }
})

export const { openCS, closeCS } = openCommentSection.actions;

export default openCommentSection.reducer;