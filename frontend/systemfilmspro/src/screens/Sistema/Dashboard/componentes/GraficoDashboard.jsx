import React from "react";
import ReactApexChart from "react-apexcharts";
import Ingresos from "../../../../utilidades/ingresos.json"
import { enRango } from "../../../../utilidades/fecha";

export default function GraficoDashboard({ seleccion
}) {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth();
  const primerDia = new Date(año, mes, 1);
  const ultimoDia = new Date(año, mes + 1, 0);


  const datosRango = (fecha) => {
    const inicio = seleccion[0] || primerDia;
    const fin = seleccion[1] || seleccion[0] || ultimoDia;
    return enRango(fecha, inicio, fin);
};

  const ingresosFiltrados = Ingresos.ventas.filter((i) => datosRango(i.fecha));

  const fechas = ingresosFiltrados.map((i) => [i.fecha, i.monto])

  const series = [{
    name: "STOCK ABC",
    data: fechas
  }];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: true
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        colorStops: [
          { offset: 0, color: "#2563eb", opacity: 0.6 },
          { offset: 100, color: "#2563eb", opacity: 0 }
        ]
      }
    },
    colors: ["#0F1EEB"],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },

    title: {
      text: 'Analisis de INgresos',
      align: 'left'
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

  return (
    <div className="row">
      <div className="mixed-chart">
        <ReactApexChart
        className="w-[300]"
        options={options}
          series={series}
          type="area"
          width="100%"
        />
      </div>
    </div>
  )
}
