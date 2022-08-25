import { createSlice } from "@reduxjs/toolkit";

const init = {
    data: null,
}

const messages = createSlice({
    name: 'messages',
    initialState: init,
    reducers: {
        openMessages: (state, action) => {
            state.data = action.payload;
        },
        closeMessages: (state) => (init)
    }
})

export const { openMessages, closeMessages } = messages.actions;

export default messages.reducer;