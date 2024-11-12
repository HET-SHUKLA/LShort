import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Dashboard = () => {

    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get(`/api/v1/user`)
        .then((res) => {
            if(res.data.data){
                setEmail(res.data.data);
            }else{
                redirect('/');
            }
        })
    });

    return (
        <>
            <h1>{email}</h1>
        </>
    );
}

export default Dashboard;
