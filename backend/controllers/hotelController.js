const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const User = require("../models/User");
async function registerHotel(req, res) {
    try {
        const data = req.body;
        const images = req.files.map((file) => file.filename);
        if (typeof data.policies == "string") {
            data.policies = JSON.parse(data.policies);
        }
        const userData = req.user;
        const newHotel = new Hotel({
            ...data, images: images, created_by: userData._id
        })
        await newHotel.save();
        await User.findByIdAndUpdate(userData._id, { role: "hotel-manager" });
        res.status(201).send({ success: true, message: "Hotel Registered Successfully" });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
async function updateHotel(req, res) {
    try {
        const hotelId = req.params.id;
        const data = req.body;
        const existingImages = Array.isArray(req.body?.existingImages) ? req.body.existingImages : [];
        const newImages = req?.files?.map((file) => file.filename);
        const images = [...existingImages, ...newImages];
        if (typeof data.policies == "string") {
            data.policies = JSON.parse(data.policies);
        }
        const oldHotel = await Hotel.findById(hotelId);
        if (!oldHotel) {
            res.status(404).send({ success: false, message: "Hotel Not Found" });
        }
        const newHotel = await Hotel.findByIdAndUpdate(hotelId, { ...data, images: images });
        res.status(201).send({ success: true, message: "Hotel Updated Successfully" });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
/* 
Query Format
destination: "array",    // city
  checkIn: "Date",         // YYYY-MM-DD
  checkOut: "Date",        // YYYY-MM-DD
  guests: "number",
  minPrice: "number",
  maxPrice: "number",
  rating: "number",        // 1-5
  page: "number",
  limit: "number",
  category: "array"
*/
async function getAllHotels(req, res) {
    try {
        const { destination, checkIn, checkOut, guests, minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, rating, page = 1, limit = 6, category } = req.query;
        const query = {};
        if (destination) {
            let filterCity = Array.isArray(destination) ? destination : [destination];
            query.city = { $in: filterCity };
        }
        if (category) {
            let filterCategory = Array.isArray(category) ? category : [category];
            query.category = { $in: filterCategory };
        }
        if (rating) {
            let filterRating = Number(rating);
            query.rating = { $gte: filterRating }
        }
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        if (!(checkIn && checkOut && guests)) {
            const start = (page - 1) * limit
            const allHotels = await Hotel.find(query).skip(start).limit(limit).lean();
            const totalHotels = await Hotel.countDocuments(query);
            return res.status(200).send({
                success: true,
                message: "Success",
                data: {
                    hotels: allHotels,
                    pagination: {
                        page,
                        limit,
                        total: totalHotels,
                        totalPages: Math.ceil(totalHotels / limit)
                    }
                }
            })
        }

        const allHotels = await Hotel.find(query).lean();
        const ans = [];
        for (let hotel of allHotels) {
            const rooms = await Room.find({
                hotel_id: hotel._id,
                capacity: { $gte: guests }
            }).lean();
            for (let room of rooms) {
                const allBooking = await Booking.countDocuments({
                    room_id: room._id,
                    check_in_date: { $lt: new Date(checkOut) },
                    check_out_date: { $gt: new Date(checkIn) },
                    status: { $in: ["pending", "confirmed"] }
                })
                const availableRooms = room.total_rooms - allBooking;
                if (availableRooms > 0) {
                    ans.push(hotel);
                    break;
                }
            }
        }
        const start = (page - 1) * limit;
        const end = start + limit;
        const totalHotels = ans.length;
        const filteredHotels = ans.slice(start, end);
        res.status(200).send({
            success: true, message: "Success", data: {
                hotels: filteredHotels,
                pagination: {
                    page,
                    limit,
                    total: totalHotels,
                    totalPages: Math.ceil(totalHotels / limit)
                }
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

async function getHotel(req, res) {
    try {
        const hotelId = req.params.id;
        const hotelData = await Hotel.findById(hotelId).lean();
        const allRooms = await Room.find({ hotel_id: hotelId });
        res.status(200).send({ success: true, message: "Success", data: { ...hotelData, rooms: allRooms } });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

async function getUserHotel(req, res) {
    try {
        const userId = req.params.userId;
        console.log(userId)
        const hotelData = await Hotel.findOne({ created_by: userId });
        if (!hotelData) {
            return res.status(400).send({ success: false, message: "No Hotel Found" });
        }
        res.status(200).send({ success: true, message: "Success", data: hotelData })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { registerHotel, updateHotel, getAllHotels, getHotel, getUserHotel }