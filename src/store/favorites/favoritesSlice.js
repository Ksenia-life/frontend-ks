import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const exists = state.some((el) => el.id === action.payload.id);
            if (!exists) {
                state.push(action.payload);
            }
        },

        removeFromFavorites: (state, action) => {
            return state.filter((el) => el.id !== action.payload);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;