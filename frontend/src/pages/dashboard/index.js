import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './style.css'

function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const usuario = localStorage.getItem('usuario');
            const response = await api.get('/dashboard', {
                headers: { usuario }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map((spot) => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.imagem_url})` }} />
                        <strong>{spot.empresa}</strong>
                        <span>{spot.preco ? `R$${spot.preco}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
        </>
    )
}
            
export default Dashboard