/* eslint-disable no-empty */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51I8jxrBUpyaRBJKBWg7O2pAWbS46UKewpHEMj2Q5UNhxRCmLxD4MXN82DOpsx9pJ7IrVTTr0oAjVlNkgAfWlMQhB000zdfveOO");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}));

app.use(express.json());


app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment received BOOM!!! ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

    console.log("Backend Client Secret ", paymentIntent);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).send({
      clientSecret: null,
      message: err.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
