import React, { useEffect, useState } from 'react';
import './benefits.css';

const Benefits = ({ benefits }) => {

    const [benefit, setBenefeit] = useState(null);
    useEffect(() => {
        setBenefeit(benefits);
    }, [benefit]);

    return (
        <div className='benefits'>
            {benefit && benefit.map((prod) => (
                <div key={prod._id} className='benefit'>
                    <img src={prod.icon} alt={prod.name} />
                    <p>{prod.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Benefits;