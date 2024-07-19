const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
    // res.status(200).json({
    //     user,
    //     token
    // })
  }
);

router.get('/verify', (req, res) => {
  if (req.user) {
    res.status('200').json(req.user);
  } else {
    res.status('403').json('not authenticated');
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.status('200').json('you are logged out successfully');
});
module.exports = router;
