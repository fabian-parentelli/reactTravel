import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../helpers/getAllUsers.js';
import { updateRole } from '../../../helpers/updateRole.js';
import Swall from 'sweetalert2';
import './listUsers.css';

const ListUsers = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const dataUser = async () => {
            const data = await getAllUsers();
            setUsers(data.result);
        };
        dataUser();
    }, []);

    const handleChangeRole = async (id) => {
        const data = await updateRole(id);

        console.log(data);

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

        if (data.status = 'success') {
            Swall.fire({
                text: `El rol del usuario se ha modificado correctamente a ${data.data.role.role}`,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        };
    };

    return (
        <div className='container'>
            <h2>Listado de usuarios</h2>
            <table className="listadoTable">

                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>

                <tbody>
                    {users ? (
                        users.map(prod => (
                            <tr key={prod._id}>
                                <td>{prod.name}</td>
                                <td>{prod.email}</td>
                                <td>{prod.role}</td>
                                <td className='acciones'>
                                    <button onClick={() => handleChangeRole(prod._id)} className={`editarButton ${prod.role === 'admin' ? 'blue' : ''}`}>
                                        Cambiar rol
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

export default ListUsers;