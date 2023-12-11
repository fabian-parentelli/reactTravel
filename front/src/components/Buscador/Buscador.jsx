import React, { useEffect, useState } from 'react';
import './buscador.css';
import { getSearchProduct } from '../../helpers/getSearchProduct.js';

function Buscador({ setShowCards, onSearchInfo }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setShowCards(!e.target.value.trim());
  };

  useEffect(() => {
    const dataCard = async () => {
      if (searchValue) {
        const info = await getSearchProduct(searchValue);
        onSearchInfo(info);
      };
    };
    dataCard();
  }, [searchValue]);

  return (
    <div className='buscador'>
      <input
        type="text"
        placeholder="Buscar por Destino, Actividad o Interés"
        name='search'
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className="search-button">BUSCAR</button>
    </div>
  );
};

export default Buscador;