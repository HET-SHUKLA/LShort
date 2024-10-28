import React, {useState} from 'react';
import axios from 'axios';

const Home = () => {

    const [url, setUrl] = useState('');
    const [short, setShort] = useState(null);

    const shortUrl = (e) => {
        
        //API request with axios
        const params = new URLSearchParams();
        params.append('fullUrl', url);

        axios.post('https://lshort.up.railway.app/api/v1/shortUrls', params)
        .then((res) => {
            setShort(`localhost:3000/${res.data.data}`);
        })
        .catch((err) => {
            setShort(err.response.data.msg);
        })
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
                <a href="#" className='text-white text-5xl'>{short}</a>
            </div>
        </div>
    );
}

export default Home;
