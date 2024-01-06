import { createSlice } from "@reduxjs/toolkit";

import { parseJSONToGraph } from "../../functions";
import getLayoutedElements from "../../functions/dagreGraph";
import type { Canvas, Component } from "../../interfaces";

interface rootState {
  value: Canvas | null;
}

const initialState: rootState = {
  value: null
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    initializeCanvas: (state, action: { payload: Component[] }) => {
      const { nodes: n, edges: e } = parseJSONToGraph(action.payload, [], []);
      state.value = getLayoutedElements(n, e, "TB");
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;
