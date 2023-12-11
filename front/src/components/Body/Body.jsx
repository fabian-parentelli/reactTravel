import './newBody.css';
import React, { useState } from 'react';
import Buscador from '../Buscador/Buscador.jsx';
import Cards from '../Cards/Cards.jsx';
import Categorias from '../Categorias/Categorias.jsx';
import BuscadorCards from '../BuscadorCards/BuscadorCards.jsx';
import BookingsBody from '../BookingBody/BookingsBody.jsx';
import DateCards from '../DateCards/DateCards.jsx';

function Body() {
  const [showCards, setShowCards] = useState(true);
  const [searchInfo, setSearchInfo] = useState(null);
  const [searchDate, setSearchDate] = useState(false);

  const handleSearchInfo = (info) => {
    setSearchInfo(info);
    setShowCards(!info);
  };

  return (
    <div className='divBody'>
      <div className="first-part">
        <Buscador setShowCards={setShowCards} onSearchInfo={handleSearchInfo} />
      </div>
      <BookingsBody setSearchDate={setSearchDate}/>
      <Categorias setShowCards={setShowCards} />
      {searchDate ? <DateCards data={searchDate}/> : showCards ? <Cards /> : <BuscadorCards info={searchInfo} />}
    </div>
  );
};

export default Body;