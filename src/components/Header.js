import logo from "../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";

const Header = ({ value, setValue }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <header className="container">
      <Link to="/">
        <img src={logo} alt="logo-vinted" />{" "}
      </Link>
      <input
        type="text"
        placeholder="Recherche des articles"
        value={value}
        onChange={handleChange}
      />
      <div className="register">
        <Link to="/signup" className="button-header">
          S'inscrire
        </Link>
        <Link to="/login" className="button-header">
          Se connecter
        </Link>
      </div>
      <Link to="/login" className="button-header button-fill">
        Vends tes articles
      </Link>
    </header>
  );
};

export default Header;
