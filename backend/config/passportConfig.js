const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
        }
        done(null, user); 
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id); 
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found during deserialization");
      return done(null, false);
    }
    done(null, user); 
  } catch (err) {
    done(err, null);
  }
});

