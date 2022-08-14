import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51LWcWGCcxHLGTi1O5UyRC2bSRcoNgtWEJSZxCLfclfLmCW3KXNdKNXjs1DNp7CdfhNyzy02fouEMTTCPksGsJRkk00sQhmT5Ll"
);
const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [paymentProceeding, setPaymentProceeding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-val.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="offer-body">
      {isLoading ? (
        <Loader />
      ) : !paymentProceeding ? (
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
            <button
              onClick={() => {
                setPaymentProceeding(true);
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={data.product_price}
            description={data.product_description}
          />
        </Elements>
      )}
    </div>
  );
};

export default Offer;
