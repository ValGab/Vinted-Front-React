import heroImg from "../assets/img/hero-vinted.jpg";
import dech from "../assets/img/dech.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Home = ({ search, setSearch, priceSort, priceMinMax }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  let round = 0;
  let dizaine = 0;
  let arrayLimit = [];
  let pageNumbers = [];

  if (count) {
    // arrondi à la dizaine supérieur du nombre d'offres
    round = 10 * Math.floor(count / 10) + 10;
    // on divise par 10 pour faire un push de toutes les dizaines
    dizaine = round / 10;
    for (let i = 1; i <= dizaine; i++) {
      if (page * 10 <= count) {
        arrayLimit.push(i * 10);
      }
      if (limit * i - limit < count) {
        pageNumbers.push(i);
      }
    }
  }

  const handleChangeLimit = (event) => {
    const value = event.target.value;
    setLimit(value);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = "?";
        if (page) {
          query = query + `page=${page} + &`;
        }

        if (limit) {
          query = query + `limit=${limit}&`;
        }

        if (search.length > 2) {
          query = query + `title=${search}&`;
        }

        if (priceSort) {
          query = query + `sort=${priceSort}&`;
        }

        if (priceMinMax) {
          query = query + `priceMin=${priceMinMax[0]}&`;
          query = query + `priceMax=${priceMinMax[1]}&`;
        }

        const response = await axios.get(
          `https://vinted-val.herokuapp.com/offers${query}`
        );
        setData(response.data);
        setIsLoading(false);
        setCount(response.data.count);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [limit, search, page, priceSort, priceMinMax]);

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <div className="home-hero">
        <img src={heroImg} alt="illustration vinted" />
        <img className="up-hero" src={dech} alt="dechirure" />
        <div className="container">
          <div className="home-hero-ready">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <Link to="/publish" className="button-hero">
              Commencer à vendre
            </Link>
          </div>
        </div>
      </div>
      <div className="limit container">
        {arrayLimit.length >= 1 && (
          <select value={limit} onChange={handleChangeLimit}>
            {/* Map sur les dizaines du tableau limit */}
            {arrayLimit.length >= 1 &&
              arrayLimit.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
          </select>
        )}
      </div>
      {/* Map sur les numéros de page */}
      <ul className="page-list container">
        {pageNumbers.length > 1 &&
          pageNumbers.map((element, index) => {
            return (
              <li key={index}>
                {page === element ? (
                  <span
                    className="bold"
                    onClick={() => {
                      setPage(element);
                    }}
                  >
                    {element}
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setPage(element);
                    }}
                  >
                    {element}
                  </span>
                )}
                <span> -</span>
              </li>
            );
          })}
      </ul>
      <div className="container-offers">
        {data.offers.length >= 1 ? (
          data.offers.map((offer) => {
            return (
              <Link
                to={`/offer/${offer._id}`}
                className="offer"
                key={offer._id}
                onClick={() => {
                  setSearch("");
                }}
              >
                <div className="owner">
                  {offer.owner && offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.product_name}
                    />
                  )}
                  {offer.owner && <p>{offer.owner.account.username}</p>}
                </div>
                <div className="product-img">
                  <img
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </div>
                <div className="product-infos">
                  <p>{offer.product_price} €</p>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="no-result">Aucun résultat</p>
        )}
      </div>
    </main>
  );
};

export default Home;
