const getSearchProduct = async (search) => {

    try {
        const response = await fetch(`http://localhost:8080/api/product/${search}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const content = await response.json();
        return content.data;

    } catch (error) {
        console.error('Error:', error.message);
    }
};

export { getSearchProduct };
