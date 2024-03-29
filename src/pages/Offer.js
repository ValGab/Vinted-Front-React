import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Offer = ({ useScrollToTop }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-app.vercel.app/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  useScrollToTop();

  return (
    <div className="offer-body">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="offer-page">
          <div className="offer-page-img">
            <img src={data.product_image.secure_url} alt={data} />
          </div>
          <div className="offer-page-infos">
            <p>{data.product_price} €</p>
            <ul className="details">
              {data.product_details.map((element, index) => {
                return (
                  <li key={index}>
                    <span>{Object.keys(element)}</span>
                    <span>{Object.values(element)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="divider"></div>
            <p className="product-name">{data.product_name}</p>
            <p className="product-description">{data.product_description}</p>
            {data.owner && (
              <div className="owner-page-offer">
                <div className="owner-page-offer-img">
                  {data.owner.account.avatar && (
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt={`avatar ${data.owner.account.username}`}
                    />
                  )}
                </div>
                <p>{data.owner.account.username}</p>
              </div>
            )}
            <Link className="button-fill" to="/payment" state={{ id }}>
              Acheter
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
