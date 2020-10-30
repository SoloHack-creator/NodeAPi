const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          process.env.GOOGLE_CLIENT_ID ||
          '1011933627363-59ntgibg5shs00of52vre0cqan6kk4e3.apps.googleusercontent.com',
        clientSecret:
          process.env.GOOGLE_SECRET_KEY || 'Xaleh3FYDaNyI1FdLKqFmXeY',
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleID: profile.id });
          if (user) {
            done(null, user);
          } else {
            console.log('inside else', user);
            user = await User.create(newUser);
            console.log('user', user);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
        // console.log('inside profile', profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
