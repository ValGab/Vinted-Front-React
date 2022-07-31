import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import { useState } from "react";
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";
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
            element={
              <Signup
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
