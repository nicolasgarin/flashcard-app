import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

export default function PieChart({ aciertos, errores }) {

    const data = [
        ["Resultado", "Cantidad"],
        ["Aciertos", aciertos],
        ["Errores", errores],
    ];

    const options = {
        width:400,
        height:300,
        is3D: true,
        colors: ['#9AEA9A', '#EA9797'],
        backgroundColor: 'transparent',
        legend: {
            textStyle: {
                color: '#B1D4E0',
                fontSize: 12
            }, strokeColor: { color: '#B1D4E0' },
        },
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"400px"}
            height={"400px"}
            position={"absolute"}
        />
    );
}