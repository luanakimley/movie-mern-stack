const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");

const client = new OAuth2Client(
  "374142562845-rrr3sqtq0c25ocgonbe25lebn4258gut.apps.googleusercontent.com"
);

exports.googlelogin = (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "374142562845-rrr3sqtq0c25ocgonbe25lebn4258gut.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong...",
            });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "7d" }
              );
              const { _id, name, email, picture } = user;

              res.json({
                token,
                user: { _id, name, email, picture },
              });
            } else {
              let password = email + process.env.JWT_SIGNIN_KEY;
              let newUser = new User({ name, email, password, picture });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "Something went wrong...",
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: "7d" }
                );
                const { _id, name, email, picture } = newUser;

                res.json({
                  token,
                  user: { _id, name, email, picture },
                });
              });
            }
          }
        });
      }
    });

  console.log();
};
