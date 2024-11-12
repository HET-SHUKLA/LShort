import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({long,short, click}) => {

    const navigate = useNavigate();

    return (
        <div className='w-3/5 bg-gray-900 flex justify-between cursor-pointer rounded-xl my-1 p-2' onClick={() => (navigate(`/analytics/${short}`))}>
            <div className='mx-2 flex flex-col justify-center'>
                <p className='text-white'>Url : <strong>{long}</strong></p>
                <p className='text-white'>Short : <strong>{short}</strong></p>
                <p className='text-white'>Total Clicks : <strong>{click}</strong></p>
            </div>

            <div className='mx-2 flex flex-col justify-center'>
                <p className='text-white'>Click here for detailed analytics {'>'}</p>
            </div>
        </div>
    );
}

export default Card;
