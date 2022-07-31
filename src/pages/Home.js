import heroImg from "../assets/img/hero-vinted.jpg";
import dech from "../assets/img/dech.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Cookies from "js-cookie";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(Number(Cookies.get("limit")) || 10);
  // const [page, setPage] = useState(1);
  // const [skip, setSkip] = useState(limit * page);

  let query = "?";
  // if (page) {
  //   query = query + `page=${page} + &`;
  // }

  if (limit) {
    query = query + `limit=${limit} + &`;
  }

  let round = 0;
  let dizaine = 0;
  let arrayLimit = [];
  if (count) {
    round = 10 * Math.floor(count / 10) + 10;
    dizaine = round / 10;
    for (let i = 1; i <= dizaine; i++) {
      arrayLimit.push(i * 10);
    }
  }

  const handleChangeLimit = (event) => {
    const value = event.target.value;
    setLimit(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers${query}`
        );
        setData(response.data);
        setIsLoading(false);
        setCount(response.data.count);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [query]);

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
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="limit container">
        <select value={limit} onChange={handleChangeLimit}>
          {/* Map sur les dizaines du tableau limit */}
          {arrayLimit.map((element, index) => {
            return (
              <option
                key={index}
                value={element}
                onClick={() => {
                  setLimit(Cookies.set("limit", element, { expires: 3 }));
                }}
              >
                {element}
              </option>
            );
          })}
        </select>
      </div>
      <div className="container-offers">
        {data.offers.map((offer) => {
          return (
            <Link to={`/offer/${offer._id}`} className="offer" key={offer._id}>
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
        })}
      </div>
    </main>
  );
};

export default Home;
