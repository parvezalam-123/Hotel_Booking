const Booking = require("../models/Booking");
const Room = require("../models/Room");

async function getUserBookings(req, res) {
    try {
        const userId = req.params.userId;
        const allBookings = await Booking.find({ user_id: userId }).populate("hotel_id").populate("room_id");
        res.status(200).send({ success: true, message: "Success", data: allBookings });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function getBookingDetails(req, res) {
    try {
        const id = req.params.id;
        const bookingData = await Booking.findById(id);
        res.status(200).send({ success: true, message: "Success", data: bookingData });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function checkAvailability(req, res) {
    try {
        const { checkIn, checkOut, number_of_guests, roomId } = req.body;
        const roomData = await Room.findById(roomId);
        if (number_of_guests > roomData.capacity) {
            return res.status(200).send({ success: true, message: "Room Capacity Is Less", isAvailable: false })
        }
        const allOccupiedBookings = await Booking.countDocuments({
            room_id: roomId,
            status: { $in: ["pending", "confirmed"] },
            check_in_date: { $lt: new Date(checkOut) },
            check_out_date: { $gt: new Date(checkIn) }
        })
        let availableRooms = roomData.total_rooms - allOccupiedBookings;
        if (availableRooms <= 0) {
            return res.status(200).send({ success: true, message: "Room Not Available", isAvailable: false })
        }
        res.status(200).send({ success: true, message: "Room Is Available", isAvailable: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}
// helper function to create demo transaction id
function createTransactionId() {
    let ans = "";
    for (let i = 0; i < 10; i++) {
        ans += parseInt(Math.random() * 10);
    }
    return ans;
}
async function createBooking(req, res) {
    try {
        const data = req.body;
        const newBooking = new Booking({ ...data, payment_status: "success", payment_method: "debit_card", transaction_id: createTransactionId() })
        await newBooking.save();
        res.status(201).send({ success: true, message: "Success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function cancelBooking(req, res) {
    try {
        const id = req.params.id;
        await Booking.findByIdAndUpdate(id, { status: "cancelled" });
        res.status(200).send({ success: true, message: "Booking Cancelled Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function updateBooking(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;
        await Booking.findByIdAndUpdate(id, { status: status });
        res.status(200).send({ success: true, message: "Booking Updated Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function getHotelBookings(req, res) {
    try {
        const hotelId = req.params.hotelId;
        const hotelBookings = await Booking.find({ hotel_id: hotelId }).populate("user_id").populate("room_id");
        res.status(200).send({ success: true, message: "Success", data: hotelBookings });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}


module.exports = {
    getUserBookings, getBookingDetails, checkAvailability, createBooking, cancelBooking, updateBooking, getHotelBookings
}