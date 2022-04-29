const Spot = require('../models/Spot');

module.exports = {

    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(techs => techs.trim()),
            price
        })

        return res.json(spot)
    }
};