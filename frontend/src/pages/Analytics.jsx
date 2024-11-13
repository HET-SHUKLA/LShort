import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Analytics = () => {

    const {short} = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`/api/v1/shortUrls/analytics/${short}`)
        .then(res => {
            setData(res.data.data);
        }).catch(err => {

        });
    }, [short]);

    function convertToFormattedDate(d){
        const date = new Date(d);
        
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        const formattedTime = date.toLocaleTimeString('en-US');

        return formattedDate + ' ' + formattedTime;
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='w-11/12 bg-gray-900 flex flex-col justify-between rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>General Detail</p>
                <p className='text-white'>Url : <strong>{data.long}</strong></p>
                <p className='text-white'>Short : <strong>{short}</strong></p>
                <p className='text-white'>Total Clicks : <strong>{data.count}</strong></p>
                <p className='text-white'>Created At : <strong>{convertToFormattedDate(data.createdAt)}</strong></p>
                <p className='text-white'>Last accessed : <strong>{convertToFormattedDate(data.lastAccessed)}</strong></p>
            </div>

            <div className='w-11/12 bg-gray-900 flex flex-col justify-between rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Region and Country Data</p>
            </div>
        </div>
    );
}

export default Analytics;
