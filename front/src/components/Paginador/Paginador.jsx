import "./paginador.css";
// import { getProducts } from "../../helpers/getProducts.js";
import React, { useState, useEffect } from 'react';


const Paginador = ({ productos, handlePrevPage, handleNextPage }) => {
  return (
    <div className="paginador">
      {productos && productos.hasPrevPage === true && (
        <button onClick={handlePrevPage}>{productos.prevPage}</button>
      )}
      {productos.page && (
        <p>
          {" "}
          <div className="select-page"><span>{productos.page}</span></div>
        </p>
      )}
      {productos && productos.hasNextPage === true && (
        <button onClick={handleNextPage}>{productos.nextPage}</button>
      )}
    </div>
  );
};

export default Paginador;
