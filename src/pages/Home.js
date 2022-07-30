import heroImg from "../assets/img/hero-vinted.jpg";
import dech from "../assets/img/dech.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

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
      <div className="container-offers">
        {data.offers.map((offer) => {
          return (
            <Link to={`/offer/${offer._id}`} className="offer" key={offer._id}>
              <div className="owner">
                {offer.owner && (
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
