import { createSlice } from "@reduxjs/toolkit";

const commentSectionSlice = createSlice({
    name: 'commentSection',
    initialState: {
        isOpen: false,
        fetchID: null,
    },
    reducers: {
        openCS: (state, action) => {
            state.isOpen = true;
            state.fetchID = action.payload;
        },
        closeCS: (state) => {
            state.isOpen = false;
            state.fetchID = null;
        }
    }
})

export const { openCS, closeCS } = commentSectionSlice.actions;

export default commentSectionSlice.reducer;