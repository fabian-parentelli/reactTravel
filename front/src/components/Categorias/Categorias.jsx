import './categorias.css';
import { categories } from '../../helpers/getCategories.js';
import { useEffect, useState } from 'react';
import { getProducts } from '../../helpers/getProducts.js';
import { Link } from 'react-router-dom';

function Categorias({ setShowCards }) {

  const [categorie, setCategoire] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const catgorias = async () => {
      const cat = await categories();
      setCategoire(cat.result);
    };
    catgorias();
  }, []);

  const handleCategory = async (name) => {
    setShowCards();
    const product = await getProducts({ query: name });
    setProductos(product.products);
  };

  return (
    <div className='categoriasContainer'>

      <div className='categorias'>
        <h2>Categorias</h2>
        <div className='categoryCards'>
          {categorie.map((categ) => (
            <div className='unidCardCategory' key={categ._id} onClick={() => handleCategory(categ.name)}>
              <h4 className='textCardCat'>{categ.name}</h4>
              <img src={categ.url} alt={categ.name} />
            </div>
          ))}
        </div>
      </div>

      <div className='cards'>
        {(productos && productos.docs) && productos.docs.map((prod) => (
          <div key={prod._id} className='cardDiv'>
            <div className='cardText'>
              <h4>{prod.title}</h4>
              <div className='cardInterText'>
                <p className='parr'>{prod.category}</p>
                <p>{prod.smalldescription}</p>
                <p className='price'>{prod.price} U$D</p>
              </div>
              <Link to={`/detail/${prod._id}`}>
                <button>Reservar</button>
              </Link>
            </div>
            <img src={prod.img[0].imgUrl} alt={prod.img[0].imgName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;