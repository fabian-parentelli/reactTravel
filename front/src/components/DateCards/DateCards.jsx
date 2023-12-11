import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const DateCards = ({ data }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(data.newResult)
    }, [data])
    console.log(productos);

    return (
        <div className='cards'>
            {productos && productos.map((prod) => (
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
                </div>
            ))}
        </div>
    )
};

export default DateCards