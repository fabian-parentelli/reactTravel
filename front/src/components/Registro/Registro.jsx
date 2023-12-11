import { useState } from "react";
import { Link } from "react-router-dom";
import { postRegister } from "../../helpers/register.js";
import Swall from 'sweetalert2';
import './Registro.css';
import '../Header/Header.jsx';
import '../Login/Login.jsx';

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postRegister(values);

    if (data.error) {
      Swall.fire({
        text: data.error,
        toast: true,
        position: "top-right",
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    };

    if (data.data.status === 'success') {
      Swall.fire({
        text: 'Usuario creado correctamente',
        toast: true,
        position: "top-right",
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location = '/login';
      }, 3000);
    };

  };

  return (
    <div className="form-container">
      <h2>Formulario de registro</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} value={values.name} type="text" name="name" placeholder="Nombre" required />
        <input onChange={handleInputChange} value={values.lastName} type="text" name="lastName" placeholder="Apellido" required />
        <input onChange={handleInputChange} value={values.email} type="email" name="email" placeholder="Email" required />
        <input onChange={handleInputChange} value={values.password} type="password" name="password" placeholder="Contraseña" required />
        <br></br>
        <button className="registro" type="submit">Registrarse</button>
      </form>
      <p className="link">¿Ya tienes una cuenta?
        <br></br>
        <Link to="../Login">
          <strong>Iniciar sesión</strong>
        </Link>
      </p>
    </div>
  );
};

export default Form;