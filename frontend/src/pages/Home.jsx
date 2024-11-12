import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

    const [url, setUrl] = useState('');
    const [short, setShort] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(`aaa : `);

        axios.get(`/api/v1/user`)
        .then((res) => {
            if(res.data.data){
                console.log(`aaa : `+res.data.data);
                
                navigate('/dashboard');
            }
        })
    });

    const shortUrl = () => {
        const params = new URLSearchParams();
        params.append('fullUrl', url);

        axios.post('/api/v1/shortUrls', params)
        .then((res) => {
            setShort(`localhost:5173/${res.data.data}`);
        })
        .catch((err) => {
            setShort(err.response.data.msg);
        })
    }

    const handleSigninClick = () => {
        window.location.href = '/api/v1/auth/google';
        // axios.get('/api/v1/auth/google')
        // .then((res) => {
        //     if(res.data.data){
        //         redirect('/dashboard');
        //     }
        // }).catch((e) => {
        //     console.log(`Something went wrong : ${e.response.data.msg}`);
            
        // })
    }

    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <div>
                <h1 className='text-white text-5xl'>URL Shortener</h1>
            </div>

            <div className='my-3 w-1/2  text-center'>
                <input type="text" placeholder='Enter URL' className='p-3 w-10/12' value={url} 
                onChange={(e) => setUrl(e.target.value)} />

                <button onClick={shortUrl} className='bg-green-600 p-3 text-white'>
                    Short
                </button>
            </div>

            <div className={``}>
                <a href={short} className='text-white text-5xl'>{short}</a>
            </div>

            <div>
                <Link to={'/click'}>
                    <button className='bg-gray-800 text-white p-3 rounded'>
                        Find Clicks
                    </button>
                </Link>

                <button className='bg-gray-800 text-white p-3 rounded' onClick={handleSigninClick}>
                    Continue with google
                </button>
            </div>
        </div>
    );
}

export default Home;
