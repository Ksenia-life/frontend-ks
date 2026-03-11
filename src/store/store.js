import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import favoritesReducer from './favorites/favoritesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
})
