const getProductByDate = async (date) => {

    const response = await fetch(`http://localhost:8080/api/booking/date/${date.startDate}/${date.endDate}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const content = await response.json();
    return content.data;
};

export { getProductByDate };