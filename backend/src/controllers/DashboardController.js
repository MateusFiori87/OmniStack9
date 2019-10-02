const Spot = require('../models/Spot')

module.exports = {
    async show(req, res) {
        const { usuario } = req.headers

        const spots = await Spot.find({ usuario });

        return res.json(spots);
    }
}