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
        console.log("Google profile ID:", profile.id); // Log Google profile ID
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          console.log("Creating new user for Google ID:", profile.id);
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
        }
        console.log("Authenticated user:", user);
        done(null, user); // Pass the user to serializeUser
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  console.log("Serializing user with ID:", user.id); // Log the user ID
  done(null, user.id); // Store the user ID in the session
});


passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user with ID:", id); // Log the ID being deserialized
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found during deserialization");
      return done(null, false);
    }
    console.log("User deserialized:", user);
    done(null, user); 
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

