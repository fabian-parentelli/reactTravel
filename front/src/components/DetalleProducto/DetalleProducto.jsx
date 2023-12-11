import React, { useState } from 'react';
import './DetalleProducto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Galeria from '../GaleriaProducto/Galeria';
import Benefits from '../Benefits/Benefits';
import BooKings from '../Bookings/Bookings.jsx'
import { current } from '../../helpers/current.js';
import Swall from 'sweetalert2';

const DetalleProducto = ({ item }) => {

    const [vewBokking, setVewBooking] = useState(false);
    const navigate = useNavigate();

    const handleVewBooking = async () => {
        const user = await current();
        if (!user) {
            Swall.fire({
                text: 'Debes estar logueado para poder reservar',
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                setTimeout(() => {
                    navigate(`/login?from=/detail/${item._id}`);
                }, 2000);
            }, 2000);
        } else {
            setVewBooking(!vewBokking);
        };
    };

    return (
        <div className="">
            <div className="top-container">
                <div className='product-title'>
                    <h1>{item.title}</h1>
                </div>
                <div className="back-home">
                    <Link to={"/"} >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                </div>
            </div>

            <div className='description-container'>
                <h3>{item.description}</h3>
                <div>
                    <button onClick={handleVewBooking} className='reserva-btn'>Reserva</button>
                </div>
            </div>
            <div className='reservas'>
                {vewBokking === true && <BooKings idProduct={item._id} />}
            </div>

            {<Galeria item={item._id} img={item.img} />}

            <div className="serviciosIncluidos">
                <h2>Servicios Incluidos</h2>
                <Benefits benefits={item.benefits} />
            </div>
        </div>
    );
};

export default DetalleProducto;