const Spot = require('../models/Spot')
const User = require('../models/Usuario')

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ tecnologias: tech })

        return res.json(spots);
    },


    async store(req, res) {
        const { filename } = req.file;
        const { empresa, tecnologias, preco } = req.body;
        const { usuario } = req.headers;

        const user = await User.findById(usuario);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe' })
        }

        const spot = await Spot.create({
            usuario: usuario,
            imagem: filename,
            empresa,
            tecnologias: tecnologias.split(',').map(tech => tech.trim()),
            preco
        })

        return res.json(spot);
    }
}