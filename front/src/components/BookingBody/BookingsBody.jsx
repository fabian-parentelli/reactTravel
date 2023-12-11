import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
// import Swall from 'sweetalert2';
import './bookingsBody.css';
import moment from 'moment';
import { getProductByDate } from '../../helpers/getProductByDate.js';


const BookingsBody = ({setSearchDate}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => { setStartDate(date) };
    const handleEndDateChange = (date) => { setEndDate(date) };

    const handleSaveData = () => {
        const data = async () => {
            const book = {};
            book.startDate = moment(startDate).format('YYYY-MM-DD');
            book.endDate = moment(endDate).format('YYYY-MM-DD');
            const result = await getProductByDate(book);
            setSearchDate(result);
        };
        data();
    };

    return (
        <div className="bookingsBody">
            <h4>Busqueda por fecha</h4>
            <div className='calendarsBody'>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
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
                    placeholderText="Fecha de fin"
                    locale={es}
                />
            </div>
            <button className='btnBookingBody' onClick={handleSaveData}>Buscar</button>
        </div>
    );
};

export default BookingsBody;