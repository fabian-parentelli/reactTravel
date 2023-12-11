
const getProducts = async (obj) => {

    const url = `http://localhost:8080/api/product?${obj.page ? `page=${obj.page}&` : ''}${obj.query ? `query=${obj.query}&` : '' }${obj.random ? `random=${obj.random}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const content = await response.json();
    return content.data;
};

export { getProducts };