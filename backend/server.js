const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDB = require("./config/db");
// Importing routes from different files
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const cors = require("cors");
const upload = require("./config/upload");
const cookieParser = require("cookie-parser");

connectToDB();
const app = express();

// using global middlewares
const allowedOrigins = process.env.FRONTEND_URLS.split(",");

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
// for allowing request from diffrent server 

app.use(express.json()); // for parsing json data
app.use(cookieParser()); //for parsing cookies

app.use(express.static("uploads/"))

app.get("/test", (req, res) => {
    res.send("Server is working...");
})
app.post("/upload/test", upload.single("filename"), (req, res) => {
    res.send("Working");
})

// using routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT}`);
})