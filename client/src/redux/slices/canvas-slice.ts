import { createSlice } from '@reduxjs/toolkit'

import { parseJSONToGraph } from '../../functions'
import type { Canvas, Component } from '../../interfaces'

interface rootState {
  value: Canvas | null
}

const initialState: rootState = {
  value: null
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    initializeCanvas: (state, action: { payload: Component[] }) => {
      state.value = parseJSONToGraph(action.payload, [], [])
    }
  }
})

// Action creators are generated for each case reducer function
export const { initializeCanvas } = canvasSlice.actions

export default canvasSlice.reducer
