import { createSlice } from "@reduxjs/toolkit";

const init = {
    topVisible: true,
    data: null,
}

const searchDetailsSlice = createSlice({
    name: 'searchDetails',
    initialState: init,
    reducers: {
        getSearchDetails: (state, action) => {
            state.topVisible = false;
            state.data = action.payload;
        },
        removeSearchDetails: () => (init)
    }
})

export const { getSearchDetails, removeSearchDetails } = searchDetailsSlice.actions;

export default searchDetailsSlice.reducer;