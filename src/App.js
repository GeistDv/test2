import React from "react";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Grid from "@mui/material/Grid";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51KH7SdLyE3w569dvyH2Va8GSPG42YBY5CCRsurEzhm5YmgA3Y6mYxgd4L1EVKtjEHOH4RcRRxsbS9AyHxU8aAJni00tiI35K4Q"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

       const { data } = await axios.post("http://localhost:3001/api/checkout", {
         id,
         amount: 20000,
       });
      //console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <img
        src="http://estaticos.elmundo.es/assets/multimedia/imagenes/2016/05/27/14643729214028.jpg"
        alt="rata"
      />
      <h2>price : 200 usd</h2>
      <div>
        <CardElement />
      </div>
      <button>Buy</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Grid sx={{ flexGrow: 6 }} container spacing={2} p={6}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <CheckoutForm />
          </Grid>
        </Grid>
      </Grid>
    </Elements>
  );
}

export default App;
