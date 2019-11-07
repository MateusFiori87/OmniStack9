import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css'

export default function New({ history }) {
    const [empresa, setEmpresa] = useState('');
    const [tecnologias, setTecnologias] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);

    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;
    }, [imagem]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const usuario = localStorage.getItem('usuario');

        data.append('imagem', imagem);
        data.append('empresa', empresa);
        data.append('tecnologias', tecnologias);
        data.append('preco', preco);

        await api.post('/spots', data, {
            headers: { usuario }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit} >
            <label
                id="imagem"
                style={{ backgroundImage: `url(${preview})` }}
                className={imagem ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setImagem(event.target.files[0])} />
                <img src={camera} alt="Selecione uma imagem" />
            </label>

            <label htmlFor="empresa">EMPRESA *</label>
            <input
                id="empresa"
                placeholder="Sua empresa incrível"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)}
            />
            <label htmlFor="tecnologias">TECNOLOGIAS  *</label>
            <input
                id="tecnologias"
                placeholder="Quais tecnologias usam?"
                value={tecnologias}
                onChange={event => setTecnologias(event.target.value)}
            />
            <label htmlFor="preco">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input
                id="preco"
                placeholder="Valor cobrado por dia"
                value={preco}
                onChange={event => setPreco(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar Spots</button>

        </form>
    )
}