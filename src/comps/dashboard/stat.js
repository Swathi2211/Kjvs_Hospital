import { Chart } from 'primereact/chart';
import 'chart.js/auto';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Stat(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [val, setVal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/attend/fetch`);
                const appointments = response.data.filter((e) => e.id === props.work);

                const updatedVal = appointments.map((e, k) => {
                    return {
                        date: e.date,
                        workHrs: calculateWorkingHours(e),
                    };
                });

                setVal(updatedVal);

                console.log(appointments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.work]);





    useEffect(() => {
        const recentVal = val.slice(-7); // Get the last 7 items from val
        const daysOfWeek = recentVal.map(entry => entry.date);
        const data = {
            labels: daysOfWeek,
            datasets: [
                {
                    label: 'Working Hours',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: val.map(entry => entry.workHrs),
                }
            ]
        };

        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Dates'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Working Hours'
                    },
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [val]);





    const calculateWorkingHours = (rowData) => {
        const parseTime = (timeString) => {
            const [time, period] = timeString.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            const isPM = period ? period.toLowerCase() === 'pm' : '';
            const adjustedHours = isPM ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
            return new Date(2000, 0, 1, adjustedHours, parseInt(minutes, 10), parseInt(seconds, 10));
        };

        const inTime = parseTime(rowData.In);
        const outTime = parseTime(rowData.Out);

        if (isNaN(inTime) || isNaN(outTime)) {
            return null; // Return null for invalid time
        }

        const timeDifference = outTime - inTime;

        if (timeDifference < 0) {
            return null; // Return null for invalid time range
        }

        // Convert milliseconds to hours with decimal places and round to 2 decimals
        const workingHours = Math.round((timeDifference / (1000 * 60 * 60)) * 100) / 100;

        return workingHours;
    };


    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
