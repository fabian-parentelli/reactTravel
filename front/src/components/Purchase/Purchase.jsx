import { useEffect, useState } from 'react';
import { getProductById } from '../../helpers/getProductById.js';
import { current } from '../../helpers/current.js';
import { newBooking } from '../../helpers/newBooking.js';

const Purchase = () => {

    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    const data = new URLSearchParams(window.location.search).get('data');
    const dataObj = JSON.parse(data);

    console.log(dataObj); // <<<<<<<<< Fecha de entarda, de salida.

    useEffect(() => {
        const data = async () => {
            const prod = await getProductById(dataObj.idProduct)
            const people = await current();
            setProduct(prod);
            setUser(people);
        };
        data();
    }, []);

    console.log(product);  // <<<<<<<<< Acá bienen los productos.

    console.log(user);  // <<<< Acá esta la data del Usuario.

    const handleNewBooking = async () => {
        const response = await newBooking(dataObj);
        // cuando haga click en algun boton para confirmar llamara a la función handleNewBooking 
        // Para guaradr la reserva en la base de datos.
    };

    return (
        <div>
            <h2>Confirmar Reserva</h2>
        </div>
    );
};

export default Purchase;