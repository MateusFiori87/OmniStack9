const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { usuario } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        console.log(usuario, spot_id, date);

        const booking = await Booking.create({
            usuario,
            spot: spot_id,
            date
        });

        await booking.populate('spot').populate('usuario').execPopulate();

        return res.json(booking);
    }
}