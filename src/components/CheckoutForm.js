import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ price, description, token, title }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buyerProtection = 0.4;
  const deliveryFee = 0.8;

  const amount = price + buyerProtection + deliveryFee;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      console.log("cardElement =>", cardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "token",
      });
      console.log("Stripe response =>", stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log("Stripe token =>", stripeToken, amount, description);
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        "https://vinted-val.herokuapp.com/offer/payment",
        {
          stripeToken,
          amount,
          description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("response.data ==>", response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.status === 200) {
        setCompleted(true);
        console.log("Status = 200", response.status);
      }
    } catch (error) {
      console.log("error ==>", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="payment-div">
        <div className="payment-form">
          <p>Résumé de la commande</p>
          <ul>
            <li>
              <span>Commande</span>
              <span>{price.toFixed(2)} €</span>
            </li>
            <li>
              <span>Frais de protection acheteurs</span>
              <span>{buyerProtection.toFixed(2)} €</span>
            </li>
            <li>
              <span>Frais de port</span>
              <span>{deliveryFee.toFixed(2)} €</span>
            </li>
          </ul>
          <div className="total-payment">
            <span>Total</span>
            <span>{amount.toFixed(2)} €</span>
          </div>
          {completed ? (
            <p className="payment-status">Paiement effectué !</p>
          ) : (
            <form className="card" onSubmit={handleSubmit}>
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span>{title}</span>. Vous allez payer{" "}
                <span>{amount.toFixed(2)} €</span> (frais de protection et frais
                de port inclus).
              </p>
              <CardElement />

              {isLoading ? (
                <p className="payment-status">Paiement en cours...</p>
              ) : (
                <button type="submit">Payer</button>
              )}
            </form>
          )}
          {/* {isLoading ? (
            <p className="payment-status">Paiement en cours...</p>
          ) : !completed ? (
            <div>
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span>{title}</span>. Vous allez payer{" "}
                <span>{amount.toFixed(2)} €</span> (frais de protection et frais
                de port inclus).
              </p>
              <form className="card" onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Payer</button>
              </form>
            </div>
          ) : (
            <p className="payment-status">Paiement effectué !</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
