const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const connectDB = require("./config/db");
const cors = require("cors");

// Controllers
const { setupNgo } = require("./controllers/ngoController");
const { setupVolunteer } = require("./controllers/volunteerController");
const { setupDonor } = require("./controllers/donorController");

// Routes
const authRoutes = require("./routes/authRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const donorRoutes = require("./routes/donorRoutes");
const donationRoutes = require("./routes/donationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const eventRoutes = require("./routes/eventRoutes");
const eventFormRoutes = require("./routes/eventFormRoutes");
const donationFormRoutes = require("./routes/donationFormRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Middleware
const { upload } = require("./middlewares/multerMiddleware");
const User = require("./models/User");

dotenv.config();
connectDB();
require("./config/passportConfig");

const app = express();
app.set("trust proxy", 1); // Trust first proxy for secure cookies

// Middleware for parsing JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
  "http://localhost:5173",
  "https://the-darpan.vercel.app",
  "https://darpan-backend-ok8w.onrender.com",
  "http://localhost:5000",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Session Configuration
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ **File Upload Route**
app.post("/upload-images", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  const imageUrls = req.files.map((file) => file.path);
  res.json({ imageUrls });
});

// Check Authentication Status
app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  }
  res.status(200).json({ isAuthenticated: false });
});

// All Routes
app.use("/auth", authRoutes);
app.use("/ngos", ngoRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/event-form", eventFormRoutes);
app.use("/api/donation-form", donationFormRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ **NGO, Volunteer, Donor Setup Routes**
app.post("/api/ngos/setup", setupNgo);
app.post("/api/volunteers/setup", setupVolunteer);
app.post("/api/donors/setup", setupDonor);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
