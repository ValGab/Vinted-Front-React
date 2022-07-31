import logo from "../assets/img/logo-vinted.png";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";

const Header = ({ value, setValue, token }) => {
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
        {!token ? (
          <div className="register">
            <Link to="/signup" className="button-header">
              S'inscrire
            </Link>
            <Link to="/login" className="button-header">
              Se connecter
            </Link>
          </div>
        ) : (
          <div className="register">
            <Link
              to="/"
              className="button-header"
              onClick={() => {
                Cookies.remove("token");
                Navigate("/");
              }}
            >
              Se déconnecter
            </Link>
          </div>
        )}
        <Link to="/login" className="button-header button-fill">
          Vends tes articles
        </Link>
      </div>
      <div className="mobile-header">
        <div className="mobile-top-header">
          <Link
            to="/"
            onClick={() => {
              if (mobileMenu === true) {
                setMobileMenu(!mobileMenu);
              }
            }}
          >
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
            <Link
              to="/login"
              className="button-header button-fill"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              Vends tes articles
            </Link>
            {!token && (
              <Link
                to="/signup"
                className="button-header"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
              >
                S'inscrire
              </Link>
            )}
            {!token && (
              <Link
                to="/login"
                className="button-header"
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                }}
              >
                Se connecter
              </Link>
            )}
            {token && (
              <Link
                to="/"
                className="button-header"
                onClick={() => {
                  Cookies.remove("token");
                  Navigate("/");
                  setMobileMenu(!mobileMenu);
                }}
              >
                Se déconnecter
              </Link>
            )}
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
