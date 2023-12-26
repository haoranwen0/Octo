import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

// Layouts and pages imports
import { Main } from "./pages"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Main />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
