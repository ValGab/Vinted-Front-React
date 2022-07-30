import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faXmark);

function App() {
  const [value, setValue] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);

  return (
    <div className="App">
      <Router>
        <Header value={value} setValue={setValue} token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup token={token} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login token={token} setUser={setUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
