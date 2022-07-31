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
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(Cookies.get("username") || null);
  const [token, setToken] = useState(Cookies.get("token") || null);

  return (
    <div className="App">
      <Router>
        <Header
          search={search}
          setSearch={setSearch}
          token={token}
          username={username}
        />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
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
                username={username}
                setUsername={setUsername}
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
