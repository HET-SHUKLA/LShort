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

        axios.post(`${import.meta.env.VITE_API_URL}/api/v1/shortUrls`, params)
        .then((res) => {
            setShort(`https://short-eta.vercel.app//${res.data.data}`);
        })
        .catch((err) => {
            setShort(err.response.data.msg);
        })
    }

    const handleSigninClick = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
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
        <div className='flex flex-col h-full w-full items-center'>
            <div className='text-center w-10/12 mt-20'>
                <h1 className='text-white text-5xl'>URL Shortener</h1>
                <h2 className='text-green-400 text-3xl my-3'>Get rid of complicated URL Shorteners.</h2>
                <p className='text-white my-5 text-2xl'>
                    A super-simple URL shortener with an intuitive interface and detailed analytics create, share, and track your links effortlessly!
                </p>
                
            </div>

            <div className='mt-5 w-full  text-center'>
                <input type="text" placeholder='Enter URL' className='p-3 w-8/12 rounded-s-md bg-gray-950 text-white' value={url} 
                onChange={(e) => setUrl(e.target.value)} />

                <button onClick={shortUrl} className='bg-green-600 p-3 text-white rounded-e-md'>
                    Short
                </button>
            </div>

            <div className={`mt-2 w-10/12 text-center`}>
                <a href={short} className='text-white text-3xl'>{short}</a>
            </div>

            <div className='mt-5 text-center'>
                <div>
                    <Link to={'/click'}>
                        <button className='bg-gray-900 text-white p-3 rounded min-w-32 border-2 border-green-600'>
                            Find Clicks
                        </button>
                    </Link>
                </div>

                <div className='mt-5 w-full flex flex-col items-center'>
                    <div className='w-10/12 text-center'>
                        <p className='text-white'>Want to see full analysis of your link? Sign up or Log in with the google.</p>
                    </div>
                    <div>
                        <button className='bg-green-600 text-white p-3 rounded min-w-32 my-2' onClick={handleSigninClick}>
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
