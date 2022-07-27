const Booking = require('../models/Booking');

const res = require("express/lib/response");

module.exports = {
    async store(req, ress) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
};