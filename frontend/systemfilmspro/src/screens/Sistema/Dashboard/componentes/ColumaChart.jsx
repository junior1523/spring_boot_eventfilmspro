import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { enRango } from "../../../../utilidades/fecha";


export default function ColumnaCHart({ seleccion}) {
  const [eventos, setEventos] = useState([]);
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth();
  const primerDia = new Date(año, mes, 1);
  const ultimoDia = new Date(año, mes + 1, 0);


  useEffect(() => {
    fetch("/eventos.json")
      .then(res => res.json())
      .then(data => (
        setEventos(data.eventos)
      ))
      .catch(err => console.log(err));

     
  }, []);



  const datosRango = (fecha) => {
      const inicio = seleccion[0] || primerDia;
      const fin = seleccion[1] || seleccion[0] || ultimoDia;
      return enRango(fecha, inicio, fin);
  };

  const eventosFiltrados = eventos.filter(e => datosRango(e.fecha));
  
  const agrupar = () => {
     const conteo = {};

     eventosFiltrados.forEach(e => {
      conteo[e.tipo] = (conteo[e.tipo] || 0) +1;
     });

     return {
      categorias: Object.keys(conteo),
      datos: Object.values(conteo)
     }
  };

  const { categorias, datos } = agrupar();

  const series = [{
    name: 'Eventos',
    data: datos
    }];

  const options = {
    chart: {
      height: 300,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    colors: [
      "#2a20a9", "#4b40e2"
    ],
    xaxis: {
      categories: categorias,
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#4b40e2',
            colorTo: '#9674f1',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }

    },
    title: {
      text: 'Eventos por fechas',
      floating: true,
      offsetY: 300,
      align: 'center',
      style: {
        color: '#9674f1'
      }
    }
  };


  return (
    <div>
      <div id="chart">
        <ReactApexChart
         options={options}
          series={series} 
          type="bar" 
          width="100%"
        height={300}/>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
