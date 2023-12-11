
// import React, { createContext, useContext, useReducer } from 'react';

// const GlobalStateContext = createContext();

// const initialState = {
//   productos: [],
// };

// const globalStateReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_PRODUCTOS':
//       return { ...state, productos: action.payload };
//     default:
//       return state;
//   }
// };

// const GlobalStateProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(globalStateReducer, initialState);

//   return (
//     <GlobalStateContext.Provider value={{ state, dispatch }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   if (!context) {
//     throw new Error('useGlobalState must be used within a GlobalStateProvider');
//   }
//   return context;
// };

// export { GlobalStateProvider, useGlobalState };*/