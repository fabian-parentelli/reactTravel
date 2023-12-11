import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../helpers/getProductById.js';
import DetalleProducto from '../DetalleProducto/DetalleProducto.jsx';

const DetailContainer = () => {

    const [item, setItem] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            setItem(await getProductById(itemId));    
        };
        getProduct();
    }, [itemId]);

    return (
        <div>
            {item && <DetalleProducto item={item.product} />}
        </div>
    );
};

export default DetailContainer;