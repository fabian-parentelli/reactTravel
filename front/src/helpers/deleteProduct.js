const deleteProduct = async (id) => {

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    const content = await response.json();
    return content.data;
};

export { deleteProduct };