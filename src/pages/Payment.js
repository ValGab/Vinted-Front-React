import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Loader from "../components/Loader";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51LWcWGCcxHLGTi1O5UyRC2bSRcoNgtWEJSZxCLfclfLmCW3KXNdKNXjs1DNp7CdfhNyzy02fouEMTTCPksGsJRkk00sQhmT5Ll"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { id } = location.state;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <Loader />
  ) : !token ? (
    <Navigate to="/login" />
  ) : (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        price={data.product_price}
        title={data.product_name}
        description={data.product_description}
        token={token}
      />
    </Elements>
  );
};

export default Payment;
