import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload
    },
    clearUserName(state) {
      state.name = ''
    },
  },
})

export const { setUserName, clearUserName } = userSlice.actions
export default userSlice.reducer
