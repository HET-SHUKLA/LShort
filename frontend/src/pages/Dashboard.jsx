import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/utils/Card';

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
    }, [email]);

    return (
        <>
            <div className='w-full text-center my-5'>
                <h1 className='text-white text-3xl'>User : {email}</h1>
            </div>

            <div className='w-full text-center mt-5'>
                <h1 className='text-white text-xl'>Your URLs</h1>
            </div>

            <div className='flex flex-col items-center'>
                {data.map((e) => (
                    <Card key={e.short} long={e.long} short={e.short} click={e.count} />
                ))}
            </div>
        </>
    );
}

export default Dashboard;
