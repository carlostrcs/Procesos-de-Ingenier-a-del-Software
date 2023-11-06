const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "816518100249-v687nv7qkgvi2ghpb5c0uepr7tt5f5rm.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://procesos-de-ingenier-a-del-software-xffzgr7cpq-ew.a.run.app/google/callback"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));
