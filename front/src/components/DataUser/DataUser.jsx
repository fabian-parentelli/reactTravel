import { useEffect, useState } from "react";
import { current } from "../../helpers/current.js";
import { updateUser } from '../../helpers/updateUser.js';
import Swall from 'sweetalert2';

const DataUser = () => {
    const token = localStorage.getItem('token');

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        email: "",
    });

    const [inputValues, setInputValues] = useState({
        name: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await current();
            const value = {
                name: data.data.name,
                lastName: data.data.lastName,
                email: data.data.email
            };
            setValues(value);
            setInputValues(value);
        };
        token && fetchData();
    }, [token]);

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateUser(inputValues);

        if (data && data.error) {
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

        if (data && data.data.status === 'success') {
            Swall.fire({
                text: 'Usuario modificado correctamente',
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location = '/';
            }, 3000);
        };
    };

    return (
        <div className="form-container">
            <h2>Modificar datos</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.name} type="text" name="name" required />
                <input onChange={handleChange} value={inputValues.lastName} type="text" name="lastName" required />
                <input onChange={handleChange} value={inputValues.email} type="email" name="email" required />
                <br></br>
                <button className="registro" type="submit">Modificar</button>
            </form>
        </div>
    );
};

export default DataUser;

