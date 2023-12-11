import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/getProducts.js';
import './cards.css';
import { Link } from 'react-router-dom';
import { newFavorite } from '../../helpers/newFavorite.js';
import { getFavorite } from '../../helpers/getFavorites.js';

const Cards = () => {
    const [productos, setProductos] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const products = async () => {
            const product = await getProducts({ random: 1 });
            setProductos(product.products);
            const fav = await getFavorite();
            fav && setFavorites(prevFavorites => [...prevFavorites, ...fav.products]);
        };
        products();
    }, []);

    const handleNextPage = async () => {
        const product = await getProducts({ page: productos.nextPage, random: 2 });
        setProductos(product.products);
    };

    const handlePrevPage = async () => {
        const product = await getProducts({ page: productos.prevPage, random: 2 });
        setProductos(product.products);
    };

    const addFav = async (productId) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.includes(productId);
            const updatedFavorites = isFavorite
                ? prevFavorites.filter(id => id !== productId)
                : [...prevFavorites, productId];
            newFavorite(updatedFavorites);
            return updatedFavorites;
        });
    };

    return (
        <div>
            <div className='cards'>
                {(productos && productos.docs) && productos.docs.map((prod) => (
                    <div key={prod._id} className='cardDiv'>
                        <div className='cardText'>
                            <h4>{prod.title}</h4>
                            <div className='cardInterText'>
                                <p className='parr'>{prod.category}</p>
                                <p className='smallDesc'>{prod.smalldescription}</p>
                            </div>
                            <div className="priceYBtn">
                                <p className='price'>{prod.price} U$D</p>
                                <Link to={`/detail/${prod._id}`}>
                                    <button>Reservar</button>
                                </Link>
                            </div>
                        </div>
                        <img src={prod.img[0].imgUrl} alt={prod.title} />
                        <div>
                            <button
                                onClick={() => addFav(prod._id)}
                                className="favButton"
                            >
                                {favorites.includes(prod._id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='paginador'>
                {(productos && productos.hasPrevPage === true) && <button onClick={handlePrevPage}>{productos.prevPage}</button>}
                {/* {productos.page && <p> <span>{productos.page}</span></p>} */}
                {productos.page && (
                    <div>
                        {" "}
                        <p className="select-page"><span>{productos.page}</span></p>
                    </div>
                )}
                {(productos && productos.hasNextPage === true) && <button onClick={handleNextPage}>{productos.nextPage}</button>}
            </div>
        </div>
    );
};

export default Cards;