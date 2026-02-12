import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import "../pages/Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51MleJgSDmf0WrF2quJoZ7Vp4MMCJjdr6tzhS9uyAMobCiDJU8CVydBReSov1MmKGXzD4SoZTu2pTNUwluhWTCyhL00LYhuFYjs",
);

export default function StripeCheckout() {
  const currentOrder = useSelector(selectCurrentOrder);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: currentOrder?.items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    
      <div className="Stripe">
        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    
  );
}
