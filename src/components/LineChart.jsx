import React from "react";
import { Chart } from "react-google-charts";

export default function LineChart({ chartData }) {

    const data = [
        ["Intentos", "Evolución"],
        ["0", 0],
        ...chartData
    ];

    const options = {
        width: 480,
        height: 250,
        legend : "none",
        colors: ['#2E8BC0'],
        backgroundColor: 'transparent',
        hAxis: {
            title: '', textStyle: {
                color: '#B1D4E0'
            }
        },
        vAxis: {
            title: '', textStyle: {
                color: '#bad7e0'
            },
        },
        'chartArea': {'width': '90%', 'height': '70%'},
    };

    return (
        <>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </>
    );
}