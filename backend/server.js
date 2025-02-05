const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const connectDB = require("./config/db");
const { setupNgo } = require("./controllers/ngoController");
const { setupVolunteer } = require("./controllers/volunteerController");
const { setupDonor } = require("./controllers/donorController");
const cors = require("cors");
const ngoRoutes = require("./routes/ngoRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const donorRoutes = require("./routes/donorRoutes");
const { upload } = require("./middlewares/multerMiddleware");
const donationRoutes = require("./routes/donationRoutes");

dotenv.config();

connectDB();

require("./config/passportConfig");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false,
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true })); 


app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/upload-images", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const imageUrls = req.files.map(file => file.path);

  res.json({ imageUrls }); 
});

// Routes
app.post("/api/ngos/setup", setupNgo);
app.post("/api/volunteers/setup", setupVolunteer);
app.post("/api/donors/setup", setupDonor);
app.use(require("./routes/authRoutes"));
app.use("/ngos", require("./routes/ngoRoutes"));
app.use("/api/donations", donationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
