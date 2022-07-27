const Spot = require('../models/Spot');

module.exports = {

    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        let { company, techs, price } = req.body;
        const { user_id } = req.headers;
        if (price){
            price = parseFloat(price)
        } 

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