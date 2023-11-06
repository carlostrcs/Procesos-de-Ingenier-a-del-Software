const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "816518100249-5kaptprkasukamlbfb2l14e1vr6pfnq8.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/google/callback"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));
