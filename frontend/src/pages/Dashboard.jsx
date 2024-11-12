import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/utils/Card';

const Dashboard = () => {

    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [short, setShort] = useState(null);

    const navigate = useNavigate();

    const getData = () => {
        if(email !== ''){
            axios.get('/api/v1/user/urls')
            .then((res) => {
                setData(res.data.data);
            }).catch((e) => {
                navigate('/');
            });
        }
    }

    const shortUrl = () => {
        const params = new URLSearchParams();
        params.append('fullUrl', url);

        axios.post('/api/v1/shortUrls', params)
        .then((res) => {
            setShort(`localhost:5173/${res.data.data}`);
            getData();
        })
        .catch((err) => {
            setShort(err.response.data.msg);
        })
    }

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
        getData();
    }, [email]);

    return (
        <>
            <div className='w-full text-center my-5'>
                <h1 className='text-white text-3xl'>User : {email}</h1>
            </div>

            <div className='mt-10 w-full text-center'>
                <input type="text" placeholder='Enter URL' className='p-3 w-8/12 rounded-s-md bg-gray-950 text-white' value={url} 
                onChange={(e) => setUrl(e.target.value)} />

                <button onClick={shortUrl} className='bg-green-600 p-3 text-white rounded-e-md'>
                    Short
                </button>
            </div>

            <div className={`mt-2 w-full text-center`}>
                <a href={short} className='text-white text-3xl'>{short}</a>
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
