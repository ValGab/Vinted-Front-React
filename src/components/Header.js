import logo from "../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({ value, setValue }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <header className="container">
      <div className="desktop-header">
        <Link to="/">
          <img src={logo} alt="logo-vinted" />
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
      </div>
      <div className="mobile-header">
        <div className="mobile-top-header">
          <Link to="/">
            <img src={logo} alt="logo-vinted" />
          </Link>
          {!mobileMenu ? (
            <FontAwesomeIcon
              icon="bars"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon="xmark"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            />
          )}
        </div>
        {mobileMenu && (
          <div className="mobile-menu">
            <Link to="/login" className="button-header button-fill">
              Vends tes articles
            </Link>
            <Link to="/signup" className="button-header">
              S'inscrire
            </Link>
            <Link to="/login" className="button-header">
              Se connecter
            </Link>
          </div>
        )}
        <div className="mobile-search">
          <input
            className="mobile search"
            type="text"
            placeholder="Recherche des articles"
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
