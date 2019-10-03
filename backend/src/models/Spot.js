const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    imagem: String,
    empresa: String,
    preco: Number,
    tecnologias: [String],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('imagem_url').get(function() {
    return `http://localhost:5000/files/${this.imagem}`
})

module.exports = mongoose.model('Spot', SpotSchema);