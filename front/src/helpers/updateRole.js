const updateRole = async (id) => {
    
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const content = await response.json();
    return content;
};

export { updateRole };