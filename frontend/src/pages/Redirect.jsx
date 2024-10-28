import axios from 'axios';
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Redirect = () => {

    const {code} = useParams();
    useEffect(() => {
        
        //API request
        axios.get(`https://lshort.up.railway.app/api/v1/shortUrls/${code}`)
        .then((res) => {
            window.location.href = res.data.data;
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
