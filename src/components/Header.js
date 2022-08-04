import logo from "../assets/img/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";
import TwoThumbs from "./TwoThumbs";

const Header = ({
  search,
  setSearch,
  priceSort,
  setPriceSort,
  username,
  setUsername,
  token,
  setUserToken,
  priceMinMax,
  setPriceMinMax,
}) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <header className="container">
      <div className="desktop-header">
        <Link to="/">
          <img
            src={logo}
            alt="logo-vinted"
            onClick={() => {
              setSearch("");
            }}
          />
        </Link>
        <div className="filters">
          <div className="search">
            <FontAwesomeIcon
              icon="search"
              onClick={() => {
                setSearch(search);
                navigate("/");
              }}
            />
            <input
              type="text"
              placeholder="Recherche des articles"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="price-filters">
            <div className="price-sort">
              <span>Trier par prix : </span>
              {priceSort === "price-desc" && (
                <button
                  className="button-fill"
                  onClick={() => {
                    setPriceSort("price-asc");
                  }}
                >
                  croissant
                </button>
              )}
              {priceSort === "price-asc" && (
                <button
                  className="button-fill"
                  onClick={() => {
                    setPriceSort("price-desc");
                  }}
                >
                  décroissant
                </button>
              )}
            </div>
            <TwoThumbs
              priceMinMax={priceMinMax}
              setPriceMinMax={setPriceMinMax}
            />
          </div>
        </div>
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
            {username && <p>Bienvenue {Cookies.get("username")} !</p>}
            <Link
              to="/"
              className="button-header"
              onClick={() => {
                setUserToken(null);
                Cookies.remove("username");
                setUsername(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </Link>
          </div>
        )}
        <Link to="/publish" className="button-header button-fill">
          Vends tes articles
        </Link>
      </div>
      <div className="mobile-header">
        <div className="mobile-top-header">
          <Link
            to="/"
            onClick={() => {
              setSearch("");
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
              to="/publish"
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
                  setUserToken(null);
                  Cookies.remove("username");
                  setUsername(null);
                  navigate("/");
                  setMobileMenu(!mobileMenu);
                }}
              >
                Se déconnecter
              </Link>
            )}
          </div>
        )}
        <div className="mobile-search">
          <FontAwesomeIcon
            icon="search"
            onClick={() => {
              setSearch(search);
              navigate("/");
            }}
          />
          <input
            type="text"
            placeholder="Recherche des articles"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
