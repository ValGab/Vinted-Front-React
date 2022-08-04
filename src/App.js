import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Publish from "./pages/Publish";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faBars, faXmark, faSearch);

function App() {
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("price-asc");
  const [username, setUsername] = useState(Cookies.get("username") || null);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUserToken = (possibleToken) => {
    if (possibleToken === null) {
      Cookies.remove("token");
      setToken(null);
    } else {
      Cookies.set("token", possibleToken, { expires: 5 });
      setToken(possibleToken);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header
          search={search}
          setSearch={setSearch}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
          token={token}
          username={username}
          setUsername={setUsername}
          setUserToken={setUserToken}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={
              <Signup
                token={token}
                setToken={setToken}
                setUserToken={setUserToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                token={token}
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                setUserToken={setUserToken}
              />
            }
          />
          <Route
            path="/publish"
            element={<Publish token={token} setToken={setToken} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
