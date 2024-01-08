import { createSlice } from '@reduxjs/toolkit'

import type { Message } from '../../interfaces'

interface rootState {
  value: Message[]
}

const initialState: rootState = {
  value: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addToChat: (state, action: { payload: Message }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToChat } = chatSlice.actions

export default chatSlice.reducer
