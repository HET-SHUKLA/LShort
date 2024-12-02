import axios from 'axios';
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Redirect = () => {

    const {code} = useParams();
    useEffect(() => {
        
        //API request
        axios.get(`https://short-eta.vercel.app/api/v1/shortUrls/${code}`)
        .then((res) => {
            let targetUrl = res.data.data;

            if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
                targetUrl = `http://${targetUrl}`;
            }

            window.location.href = targetUrl;
        })
        .catch((err) => {
            console.log(err.response.data.msg);
        })
        
    });

    return (
        <>
        </>
    );
}

export default Redirect;
