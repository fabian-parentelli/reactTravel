async function postLogin(values) {
    
    const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const content = await response.json();
    return content;
};

export { postLogin };
