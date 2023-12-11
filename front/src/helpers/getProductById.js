const getProductById = async (id) => {

    const response = await fetch(`http://localhost:8080/api/product/id/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const content = await response.json();
    return content.data;
};

export { getProductById };