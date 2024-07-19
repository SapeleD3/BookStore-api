const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load Usermodel
const User = mongoose.model('users');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('3', accessToken);

        const image = profile.photos[0].value;
        const newUser = {
          googleID: profile.id,
          email: profile.emails[0].value,
          firstname: profile.name.givenName,
          lastName: profile.name.familyName,
          image: image,
        };
        const usertoken = { token: accessToken };

        //check for oldUser
        User.findOne({
          googleID: profile.id,
        }).then((user) => {
          if (user) {
            done(null, user, usertoken);
            console.log('2', user, usertoken);
          } else {
            new User(newUser).save().then((user) => {
              console.log('1', user);
              done(null, user, usertoken);
            });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
  });
};
