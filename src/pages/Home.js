import heroImg from "../assets/img/hero-vinted.jpg";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  return (
    <main>
      <div className="home-hero">
        <img src={heroImg} alt="illustration vinted" />
        <div className="container">
          <div className="home-hero-ready">
            <p>Prêts à faire du tri dans vos placards ?</p>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className="container-offers">
        {data.offers.map((offer) => {
          console.log(offer);
          return (
            <Link to={`/offer/${offer._id}`} className="offer" key={offer._id}>
              {offer.owner ? (
                <div className="owner">
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.product_name}
                  />
                  <p>{offer.owner.account.username}</p>
                </div>
              ) : (
                <div className="owner"></div>
              )}
              <div className="product-img">
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
              </div>
              <div className="product-infos">
                <p>{offer.product_price.toFixed(2)} €</p>
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
