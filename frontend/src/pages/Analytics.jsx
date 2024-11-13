import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart } from "react-google-charts";

const Analytics = () => {

    const {short} = useParams();
    const [data, setData] = useState({});
    const [country, setCountry] = useState({});
    const [region, setRegion] = useState(null); // State for the selected region

    const handleRegionSelect = ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 0) return;

        // Get the country/region ISO code from the selected row
        const selectedCountry = country[selection[0].row + 1][0]; // Adjust based on your data structure
        console.log("Selected:", selectedCountry);
        
        // Update the region to zoom into the selected country
        setRegion(selectedCountry);
    };

    const handleZoomOut = () => {
        setRegion(null); // Reset the region to null to zoom out to the world view
    };

    const chartOptions = {
        region: region || "world", // Set to specific country code if region is selected
        displayMode: "regions",
        resolution: region ? "provinces" : "countries", // Show provinces when zoomed in
        colorAxis: { colors: ["#e7711c", "#4374e0"] }, // Example color range
    };

    useEffect(() => {
        axios.get(`/api/v1/shortUrls/analytics/${short}`)
        .then(res => {
            setData(res.data.data);
            setCountry(getCountryData(res.data.data));
        }).catch(err => {

        });
    }, [short]);

    function convertToFormattedDate(d){
        const date = new Date(d);
        
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        const formattedTime = date.toLocaleTimeString('en-US');

        return formattedDate + ' ' + formattedTime;
    }

    function getCountryData(d){
        let data = [["Country", "Clicks"]];
        let countryCount = {}; 

        d.analytics.forEach(e => {
            if (e.ipData.country !== 'not fetched') {
                const country = e.ipData.country;

                if (countryCount[country]) {
                    countryCount[country]++;
                } else {
                    countryCount[country] = 1;
                }
            }
        });

        for (const country in countryCount) {
            data.push([country, countryCount[country]]);
        }
        
        return data;
    }
    
    return (
        <div className='flex flex-col items-center'>
            <div className='w-11/12 bg-gray-900 flex flex-col justify-between rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>General Detail</p>
                <p className='text-white'>Url : <strong>{data.long}</strong></p>
                <p className='text-white'>Short : <strong>{short}</strong></p>
                <p className='text-white'>Total Clicks : <strong>{data.count}</strong></p>
                <p className='text-white'>Created At : <strong>{convertToFormattedDate(data.createdAt)}</strong></p>
                <p className='text-white'>Last accessed : <strong>{convertToFormattedDate(data.lastAccessed)}</strong></p>
            </div>

            <div className='w-11/12 bg-gray-900 flex flex-col justify-between rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Region and Country Data</p>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <Chart
                    chartEvents={[
                        {
                            eventName: "select",
                            callback: handleRegionSelect,
                        },
                    ]}
                    chartType="GeoChart"
                    width="100%"
                    height="100%"
                    data={country}
                    options={chartOptions}
                />
            </div>
        </div>
    );
}

export default Analytics;
