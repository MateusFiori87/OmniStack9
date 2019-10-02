const Usuario = require('../models/Usuario')

// index, show, store, update, destroy
module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            usuario = await Usuario.create({ email })
        }       

        return res.json(usuario);
    }
};