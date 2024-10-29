import axios from 'axios';
import React, {useState} from 'react';

const ClickCount = () => {

    const [url, setUrl] = useState('');
    const [count, setCount] = useState('');

    const shortUrl = (e) => {
        let last6 = url.substring(url.length-6, url.length);
        
        axios.get(`/api/v1/shortUrls/${last6}/click`)
        .then((res) => {
            setCount(res.data.data);
        })
        .catch((err) => {
            setCount(err.response.data.msg);
        })
    }

    return (
        <>
            <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <div>
                <h1 className='text-white text-5xl'>Click Counter</h1>
            </div>

            <div className='my-3 w-1/2  text-center'>
                <input type="text" placeholder='Enter Short URL / Code' className='p-3 w-10/12' value={url} 
                onChange={(e) => setUrl(e.target.value)} />

                <button onClick={shortUrl} className='bg-green-600 p-3 text-white'>
                    Find
                </button>
            </div>

            <div className={``}>
                <p className={`text-white text-5xl`}>{count}</p>
            </div>
        </div>
        </>
    );
}

export default ClickCount;
