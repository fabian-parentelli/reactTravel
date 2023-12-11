import './App.css'
import Header from './components/Header/Header'
import Listado from './components/PanelAdmin/Listado'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './Routes/routes';
import Body from './components/Body/Body';
import CrearProducto from './components/PanelAdmin/CrearProducto';
import AdminPanel from './components/PanelAdmin/AdminPanel';
import DetalleProducto from './components/DetalleProducto/DetalleProducto';
import Galeria from './components/GaleriaProducto/Galeria';
import Registro from './components/Registro/Registro';
import Login from './components/Login/Login';
import DataUser from './components/DataUser/DataUser';
import Bookings from './components/Bookings/Bookings';
import DetailContainer from './components/DetailContainer/DetailContainer';
import ListUsers from './components/PanelAdmin/ListUsers/ListUsers';
import UpdateProduct from './components/PanelAdmin/UpdateProduct/UpdateProduct';
import Purchase from './components/purchase/purchase';

/* Test Gabo */

function App() {
	return (
		<BrowserRouter>
			{/* Envuelve toda la aplicación con BrowserRouter para el enrutamiento */}
			{/* Envuelve la aplicación con ContextGlobal para el estado global */}
			<div className="app">
				<Header />
				<div className='place'></div>
				<Routes>
					{/*Página de inicio - Home*/}
					<Route path="/" element={<Body />} />
					{/*Página de inicio - Home*/}
					<Route path={routes.producto} element={<Listado />} />
					<Route path={routes.registrarse} element={<Registro />} />
					{/*Página Login*/}
					<Route path={routes.login} element={<Login />} />
					{/*Página principal administradores*/}
					<Route path={routes.admiPanel} element={<AdminPanel />} />
					{/*Página para crear productos*/}
					<Route path={routes.crearProducto} element={<CrearProducto />} />
					{/*Página detalle productos*/}
					<Route path={routes.detalleProducto} element={<DetalleProducto />} />
					<Route path={routes.detail} element={<DetailContainer />} />
					{/*Muestra imagenes de producto*/}
					<Route path={routes.Galeria} element={<Galeria />} />
					<Route path={routes.dataUser} element={<DataUser />}/>
					<Route path={routes.bookings} element={<Bookings />}/>
					<Route path={routes.listUser} element={<ListUsers />}/>
					<Route path={routes.updateProduct} element={<UpdateProduct />}/>
					<Route path={routes.purchase} element={<Purchase />}/>
				</Routes>
				{ <Footer /> }
			</div>
		</BrowserRouter>
	)
}

export default App