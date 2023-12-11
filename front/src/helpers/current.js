async function current() {

    const token = localStorage.getItem('token');

    if (token) {
        const response = await fetch('http://localhost:8080/api/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const content = await response.json();
        return content;
    };
};

export { current };