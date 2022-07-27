const Booking = require('../models/Booking');

module.exports = {
     async store(req, res)  {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        const new_booking = await Booking.findOne({ user: user_id }).populate('spot').populate('user').lean().exec();

        console.log(new_booking)

        const ownerSocket = req.connectUsers[user_id];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', new_booking);
        }

        return res.json(new_booking);        
    }
};