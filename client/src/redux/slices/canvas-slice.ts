import { createSlice } from '@reduxjs/toolkit'

import { parseJSONToGraph } from '../../functions'
import getLayoutedElements from '../../functions/dagreGraph'
import type { Canvas, JSONComponent } from '../../types'

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
    initializeCanvas: (state, action: { payload: JSONComponent[] }) => {
      const { nodes: n, edges: e } = parseJSONToGraph(action.payload, [], [])
      state.value = getLayoutedElements(n, e, 'LR')
    }
  }
})

// Action creators are generated for each case reducer function
export const { initializeCanvas } = canvasSlice.actions

export default canvasSlice.reducer
