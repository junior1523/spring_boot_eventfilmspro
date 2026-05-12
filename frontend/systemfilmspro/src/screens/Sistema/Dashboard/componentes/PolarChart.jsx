import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function PolarChart() {
    const [eventos, setEventos] = useState([]);


    useEffect(() => {
        fetch("/eventos.json")
            .then(res => res.json())
            .then(data => {
                setEventos(data.eventos);
            })
            .catch(err => console.log(err));
    }, []);

    const agruparEventos  = () => {
        const conteo = {}

        eventos.forEach(e => {
            conteo[e.tipo] = (conteo[e.tipo] || 0 ) + 1;
        });

        return {
            labels: Object.keys(conteo),
            series: Object.values(conteo)
        }
    }

    const {labels, series} = agruparEventos()
    

    const options = {
        chart: {
            type: 'polarArea',
        },
        labels: labels,
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        responsive: [
            {
                breakpoint: 1280,
                options: {
                    chart: { width: 650 },
                    legend: { position: 'bottom' }
                }
            },
            {
                breakpoint: 700,
                options: {
                    chart: { width: 200 },
                    legend: { position: 'left' }
                }
            }
        ]
    };


    return (
        <div>
            <div className="w-auto" id="chart">
                <ReactApexChart 
                 width="100%"
                options={options} series={series} type="polarArea" />
            </div>

        </div>
    );
}