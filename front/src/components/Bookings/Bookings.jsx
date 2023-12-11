import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import es from 'date-fns/locale/es';
import { getBooking } from '../../helpers/getBooking.js';
import { getConfirmDate } from '../../helpers/getConfirmDate.js';
import './booking.css';
import Swall from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const getAllDatesBetweenRanges = (dateRanges) => {
    let allDates = [];

    dateRanges.forEach((dateRange) => {
        const currentDate = moment(dateRange.startDate);
        const endDate = moment(dateRange.endDate);
        while (currentDate.isSameOrBefore(endDate)) {
            allDates.push(currentDate.format('YYYY-MM-DD'));
            currentDate.add(1, 'days');
        };
    });
    return allDates;
};

const Bookings = ({ idProduct }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const allDate = async () => {
            const datas = await getBooking(idProduct);
            setData(datas)
        };
        allDate();
    }, []);

    const allDates = data?.date ? getAllDatesBetweenRanges(data.date) : [];
    const isDateEnabled = (date) => {
        return !allDates.includes(moment(date).format('YYYY-MM-DD'));
    };
    const handleStartDateChange = (date) => { setStartDate(date) };
    const handleEndDateChange = (date) => { setEndDate(date) };

    const handleSaveData = () => {
        const data = async () => {
            const book = {};
            book.idProduct = idProduct;
            book.startDate = moment(startDate).format('YYYY-MM-DD');
            book.endDate = moment(endDate).format('YYYY-MM-DD');
            book.idProduct = idProduct;
            const response = await getConfirmDate(book);
            const stringBook = JSON.stringify(book);

            if (response.error) {
                Swall.fire({
                    text: response.error,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            };

            if (response.data.status === 'success') {
                Swall.fire({
                    text: 'Estas a un paso de que el producto sea tuyo',
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
                    navigate(`/purchase?data=${stringBook}`);
                }, 3000);
            };
        };
        data();
    };

    return (
        <div className="bookings">
                <h2>Reservas</h2>
            <div className='calendars'>
                {/* <span className="dismiss" onClick={handleClick}>
                    x
                </span> */}
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    filterDate={isDateEnabled}
                    placeholderText="Fecha de inicio"
                    locale={es}
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    filterDate={isDateEnabled}
                    placeholderText="Fecha de fin"
                    locale={es}
                />
            </div>
                <button className='btnBooking' onClick={handleSaveData}>Reservar</button>
        </div>
    );
};

export default Bookings;