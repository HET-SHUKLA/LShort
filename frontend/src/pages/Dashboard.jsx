import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/v1/user`)
        .then((res) => {
            if(res.data.data){
                setEmail(res.data.data);
            }else{
                navigate('/');
            }
        })
    });

    return (
        <>
            <h1 className='text-white'>{email}</h1>
        </>
    );
}

export default Dashboard;
