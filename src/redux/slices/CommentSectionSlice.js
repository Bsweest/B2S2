import { createSlice } from "@reduxjs/toolkit";

const commentSectionSlice = createSlice({
    name: 'commentSection',
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

export const { openCS, closeCS } = commentSectionSlice.actions;

export default commentSectionSlice.reducer;