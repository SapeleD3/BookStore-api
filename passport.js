const passport = require('passport');
const gpts = require('passport-google-plus-token');
const User = require('./models/User');
const config = require('./config/keys');

//google oauth strategy
passport.use(
  'googleToken',
  new gpts(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
    },
    async (accessToken, refreshTokwn, profile, done) => {
      try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshTokwn);
        console.log('profile', profile);

        //check if user exist in database
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          console.log('User Already exists in our database');
          return done(null, existingUser);
        }
        console.log('User doesnt exist we are creating a newone');
        //if new user
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            name: profile.name.familyName,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
