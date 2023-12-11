const newFavorite = async (favorite) => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/api/favorite', {
        method: 'POST',
        body: JSON.stringify(favorite),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    const content = await response.json();
    return content;
};

export { newFavorite };