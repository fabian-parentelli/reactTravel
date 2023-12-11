const newProduct = async (product) => {

    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:8080/api/product', {
        method: 'POST',
        body: product,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    const content = await response.json();
    return content;
};

export { newProduct };