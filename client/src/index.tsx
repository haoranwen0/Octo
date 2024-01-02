import React, { StrictMode } from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { persistor, store } from './redux/store'
import './index.css'

const container = document.getElementById('root')
if (container === null) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
