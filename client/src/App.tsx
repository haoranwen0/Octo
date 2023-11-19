import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages";

function App() {
  React.useEffect(() => {
    axios.get("http://localhost:8000/testing").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
