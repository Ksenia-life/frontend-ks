import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'
import favoritesReducer from './favorites/favoritesSlice'

const STORAGE_KEY = 'frontend-ks-store'

function loadState() {
  if (typeof window === 'undefined') {
    return undefined
  }

  try {
    const savedState = localStorage.getItem(STORAGE_KEY)

    if (!savedState) {
      return undefined
    }

    return JSON.parse(savedState)
  } catch (error) {
    console.error('Не удалось загрузить state из localStorage', error)
    return undefined
  }
}

function saveState(state) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const stateToSave = {
      user: state.user,
      favorites: state.favorites,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
  } catch (error) {
    console.error('Не удалось сохранить state в localStorage', error)
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState())
})
