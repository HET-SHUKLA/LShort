import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart } from "react-google-charts";

const Analytics = () => {

    const {short} = useParams();
    const [data, setData] = useState({});
    const [country, setCountry] = useState({});
    const [state, setState] = useState({}); 
    const [region, setRegion] = useState(null); 
    const [calendar, setCalendar] = useState({});
    const [browser, setBrowser] = useState({});
    const [os, setOs] = useState({});

    const handleRegionSelect = ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 0) return;
        
        const selectedCountry = country[selection[0].row + 1][0]; // Adjust based on your data structure
                
        setState(getRegionData(data, selectedCountry));
        setRegion(selectedCountry);
    };

    function getRegionData(d, s){
        let data = [["Region", "Clicks"]];
        let countryCount = {};

        d.analytics.forEach(e => {
            const lcountry = e.ipData.country;
            const lstate = e.ipData.region;

            if (lcountry === s) {
                if (countryCount[lstate]) {
                    countryCount[lstate]++;
                } else {
                    countryCount[lstate] = 1;
                }
            }
        });

        for (const country in countryCount) {
            data.push([country, countryCount[country]]);
        }
        
        console.log(data);
        
        return data;
    }

    const handleZoomOut = () => {
        setRegion(null);
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
            const data = res.data.data;
            setData(data);
            setCountry(getCountryData(data));
            setCalendar(getCalendarData(data));
            setOs(getOsData(data));
            setBrowser(getBrowserData(data));            
        }).catch(err => {

        });
    }, [short]);

    function getBrowserData(d){
        let data = [["Browser", "Users"]];
        let countryCount = {};

        d.analytics.forEach(e => {
            const lcountry = e.userAgent.browser;

            if (lcountry !== null) {
                if (countryCount[lcountry]) {
                    countryCount[lcountry]++;
                } else {
                    countryCount[lcountry] = 1;
                }
            }
        });

        for (const country in countryCount) {
            data.push([country, countryCount[country]]);
        }
        
        return data;
    }

    function getOsData(d){
        let data = [["Country", "Clicks"]];
        let countryCount = {};

        d.analytics.forEach(e => {
            const lcountry = e.userAgent.os;

            if (lcountry !== null) {
                if (countryCount[lcountry]) {
                    countryCount[lcountry]++;
                } else {
                    countryCount[lcountry] = 1;
                }
            }
        });

        for (const country in countryCount) {
            data.push([country, countryCount[country]]);
        }
        
        return data;
    }

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
            const lcountry = e.ipData.country;

            if (lcountry !== 'not fetched') {
                if (countryCount[lcountry]) {
                    countryCount[lcountry]++;
                } else {
                    countryCount[lcountry] = 1;
                }
            }
        });

        for (const country in countryCount) {
            data.push([country, countryCount[country]]);
        }
        
        return data;
    }

    function getCalendarData(d){
        let ldata = [[
            {
              type: "date",
              id: "Date",
            },
            {
              type: "number",
              id: "Click",
            },
          ],];

        let timeCount = {};

        d.analytics.forEach(e => {
            const lTime = e.currTime;
            const date = new Date(lTime);
            
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            
            const dateKey = `${year}-${month}-${day}`;

            if (lTime !== null) {
                if (timeCount[dateKey]) {
                    timeCount[dateKey]++;
                } else {
                    timeCount[dateKey] = 1;
                }
            }
        });

        for (const dateKey in timeCount) {
            const [year, month, day] = dateKey.split("-").map(Number);
            ldata.push([new Date(year, month - 1, day), timeCount[dateKey]]);
        }
                
        return ldata;
    }

    function downloadAsJSON(data) {
        const json = JSON.stringify(data, null, 2); // Convert data to JSON format
        const blob = new Blob([json], { type: "application/json" }); // Create a blob
        const url = URL.createObjectURL(blob); // Generate a download URL
        const a = document.createElement("a"); // Create a link element
        a.href = url;
        a.download = "data.json"; // Set the file name
        a.click(); // Trigger download
        URL.revokeObjectURL(url); // Clean up
    }
    
    function downloadAsCSV(data) {
        const csvRows = [];
    
        // Convert headers to CSV
        const headers = ["Date", "Click"];
        csvRows.push(headers.join(",")); // Join headers with comma
    
        // Convert each data row to CSV format
        data.slice(1).forEach(row => {
            const date = new Date(row[0]);
            const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const clicks = row[1];
            csvRows.push(`${formattedDate},${clicks}`);
        });
    
        // Join rows with newlines
        const csvString = csvRows.join("\n");
    
        // Create a blob and trigger download
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();
        URL.revokeObjectURL(url);
    }
    

    return (
        <div className='flex flex-col items-center'>
            <div className='w-11/12 bg-gray-900 flex flex-col justify-center rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>General Detail</p>
                <p className='text-white'>Url : <strong>{data.long}</strong></p>
                <p className='text-white'>Short : <strong>{short}</strong></p>
                <p className='text-white'>Total Clicks : <strong>{data.count}</strong></p>
                <p className='text-white'>Created At : <strong>{convertToFormattedDate(data.createdAt)}</strong></p>
                <p className='text-white'>Last Clicked : <strong>{convertToFormattedDate(data.lastAccessed)}</strong></p>
            </div>

            <div className='w-11/12 bg-gray-900 flex flex-col justify-center rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Country and Region wise click</p>
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
                    data={!region && country || state}
                    options={chartOptions}
                />
            </div>
            
            <div className='w-11/12 bg-gray-900 flex flex-col justify-center items-center rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Day wise click</p>
                
                <Chart
                    chartType="Calendar"
                    width="100%"
                    height="100%"
                    data={calendar}

                />
            </div>

            <div className='w-11/12 bg-gray-900 flex flex-col justify-center items-center rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Browser and OS data</p>
                
                <div className='w-10/12 flex justify-between '>
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={browser}
                            width={"100%"}
                            height={"400px"}
                            options={{title: 'Browser'}}
                        />
                    </div>
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={os}
                            width={"100%"}
                            height={"400px"}
                            options={{title: 'OS'}}
                        />
                    </div>
                </div>

            </div>

            <div className='w-11/12 bg-gray-900 flex flex-col justify-center items-center rounded-xl my-1 p-2'>
                <p className='text-white text-xl text-center'>Other data like City and Longatude and Latitude of the user are available, you can download your data either in JSON or CSV formate.</p>
                
                <div>
                    <button onClick={() => downloadAsJSON(data.analytics)} className='mx-5'>Download JSON</button>
                    <button onClick={() => downloadAsCSV(data.analytics)} className='mx-5'>Download CSV</button>
                </div>
            </div>

        </div>
    );
}

export default Analytics;
