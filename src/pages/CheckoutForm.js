import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentOrder = useSelector(selectCurrentOrder);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔹 Submit clicked");
    console.log("Stripe loaded:", !!stripe);
    console.log("Elements loaded:", !!elements);
    console.log("Current Order:", currentOrder);

    if (!stripe || !elements) {
      console.warn("❌ Stripe or Elements not ready");
      return;
    }

    if (!currentOrder?.id) {
      console.error("❌ Order ID missing");
      setMessage("Order ID missing. Cannot proceed.");
      return;
    }

    setIsLoading(true);

    const returnUrl = `http://localhost:3000/order-success/${currentOrder.id}`;
    console.log("➡️ Return URL:", returnUrl);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      console.log("Stripe confirmPayment result:", result);

      // ✅ IMPORTANT: Only handle error if it EXISTS
      if (result.error) {
        console.error("❌ Stripe error:", result.error);

        if (
          result.error.type === "card_error" ||
          result.error.type === "validation_error"
        ) {
          setMessage(result.error.message);
        } else {
          setMessage("Unexpected payment error.");
        }
      } else {
        // ✅ SUCCESS FLOW NEVER COMES HERE (Stripe redirects)
        console.log("✅ No immediate error. Redirecting via Stripe...");
      }
    } catch (err) {
      console.error("🔥 Exception during confirmPayment:", err);
      setMessage("Payment failed due to a system error.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        {isLoading ? "Processing..." : "Pay now"}
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

