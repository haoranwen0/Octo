import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import canvasReducer from './slices/canvas-slice'
import chatReducer from './slices/chat-slice'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  chat: chatReducer,
  canvas: canvasReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk]
})

export const persistor = persistStore(store)
export type IRootState = ReturnType<typeof rootReducer>
