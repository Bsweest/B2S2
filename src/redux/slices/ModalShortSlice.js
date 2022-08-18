import { createSlice } from "@reduxjs/toolkit";

const init = {
    isVisible: false,
    data: null,
}

const modalShortSlice = createSlice({
    name: 'modalShort',
    initialState: init,
    reducers: {
        openModalShort: (state, action) => {
            state.isVisible = true;
            state.data = action.payload;
        },
        closeModalShort: (state) => (init)
    }
})

export const { openModalShort, closeModalShort } = modalShortSlice.actions;

export default modalShortSlice.reducer;