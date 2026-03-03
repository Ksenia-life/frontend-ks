import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            const data = state.filter((el) => el.id !== action.payload);
            return [...data];
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;