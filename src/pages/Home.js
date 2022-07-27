import heroImg from "../assets/img/hero-vinted.jpg";

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
      <div className="offers">
        {data.offers.map((offer) => {
          console.log(offer.owner.account.avatar.secure_url);
          return (
            <div key={offer._id}>
              <p>
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt={offer.product_name}
                />
              </p>
              <img
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
