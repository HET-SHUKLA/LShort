import axios from 'axios';
import React, {useState} from 'react';

const ClickCount = () => {

    const [url, setUrl] = useState('');
    const [count, setCount] = useState('');

    const shortUrl = () => {
        let last6 = url.substring(url.length-6, url.length);
        
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/shortUrls/${last6}/click`)
        .then((res) => {
            setCount(res.data.data);
        })
        .catch((err) => {
            setCount(err.response.data.msg);
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
        <div className='flex flex-col h-full w-full items-center'>
            <div className='text-center w-10/12 mt-20'>
                <h1 className='text-white text-5xl'>Click Finder</h1> 
            </div>

            <div className='mt-5 w-full  text-center'>
                <input type="text" placeholder='Enter Short URL or Code' className='p-3 w-8/12 rounded-s-md bg-gray-950 text-white' value={url} 
                onChange={(e) => setUrl(e.target.value)} />

                <button onClick={shortUrl} className='bg-green-600 p-3 text-white rounded-e-md'>
                    Find
                </button>
            </div>

            <div className={`mt-2 w-10/12 text-center`}>
                <p className='text-white text-3xl'>{count}</p>
            </div>

            <div className='mt-10 w-full flex flex-col items-center'>
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
        // <>
        //     <div className='flex flex-col h-screen w-screen justify-center items-center'>
        //     <div>
        //         <h1 className='text-white text-5xl'>Click Counter</h1>
        //     </div>

        //     <div className='my-3 w-1/2  text-center'>
        //         <input type="text" placeholder='Enter Short URL / Code' className='p-3 w-10/12' value={url} 
        //         onChange={(e) => setUrl(e.target.value)} />

        //         <button onClick={shortUrl} className='bg-green-600 p-3 text-white'>
        //             Find
        //         </button>
        //     </div>

        //     <div className={``}>
        //         <p className={`text-white text-5xl`}>{count}</p>
        //     </div>
        // </div>
        // </>
    );
}

export default ClickCount;
