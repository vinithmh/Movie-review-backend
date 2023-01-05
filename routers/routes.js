const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/signupmodels");
const movieReviewTemplateCopy = require("../models/moviereview");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Collection } = require("mongoose");
const UserDetail = require("../models/signinmodels");
const axios = require("axios");
const { response } = require("express");

const JWT_SECRET = "sdbciwhcwbsckwwschdakuch";

router.post("/signup", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);
  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

router.post("/signin", async (request, response) => {
  const { email, password } = request.body;

  const user = await UserDetail.findOne({ email });

  if (!user) {
    return response.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);
    if (response.status(201)) {
      return response.json({ status: "ok", data: token });
    }
  }
  response.json({ status: "error", error: "Invalid Password" });
});

router.post("/home", async (request, response) => {
  const movieReview = new movieReviewTemplateCopy({
    movieName: request.body.movieName,
    movieReview: request.body.movieReview,
  });
  movieReview
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
