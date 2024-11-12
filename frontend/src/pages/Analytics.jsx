import React from 'react';
import { useParams } from 'react-router-dom';

const Analytics = () => {

    const {short} = useParams();

    return (
        <div>
            {short}
        </div>
    );
}

export default Analytics;
