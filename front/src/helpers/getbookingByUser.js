const getBookingByUser = async () => {

    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:8080/api/booking`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    const content = await response.json();
    console.log(content);
    return content;
};

export { getBookingByUser };