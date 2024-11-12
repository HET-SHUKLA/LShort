import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
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

    useEffect(() => {
        if(email !== ''){
            axios.get('/api/v1/user/urls')
            .then((res) => {
                setData(res.data.data);
            }).catch((e) => {
                navigate('/');
            });
        }
    });

    return (
        <>
            <h1 className='text-white'>{email}</h1>

            <div>
                {data.map((e) => (
                    <div key={e.short}>
                        <p>{e.short} : {e.count}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Dashboard;
