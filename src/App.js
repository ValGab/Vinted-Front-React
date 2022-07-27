import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response); // différent du error.message d'Express sur back
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <Router>
          <Header value={value} setValue={setValue} />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
