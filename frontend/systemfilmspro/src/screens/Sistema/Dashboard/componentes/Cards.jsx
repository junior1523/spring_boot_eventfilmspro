import CardEstadistico from "../../../../componentes/ui/CardEstadistico"
import Ingresos from "../../../../utilidades/ingresos.json"
import Ediciones from "../../../../utilidades/ediciones.json"
import Eventos from "../../../../utilidades/eventos.json"
import Contratos from "../../../../utilidades/contratos.json"

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LuFileSpreadsheet, LuCalendarDays } from "react-icons/lu";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { enRango  }from "../../../../utilidades/fecha.jsx"

export default function CardsDashboard({ seleccion }) {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();
    const inicioMes = new Date(año,mes,1);
    const finMes = new Date(año,mes+1,0);

   const datosRango = (fecha) => {
    const inicio = seleccion[0] || inicioMes;
    const fin = seleccion[1] || seleccion[0] || finMes; 
    return enRango(fecha, inicio, fin);
};
  
   const ingresosFiltrados = Ingresos.ventas.filter((v) => datosRango(v.fecha));
   const ingresosTotales = ingresosFiltrados.reduce((acc,i) => acc+i.monto, 0);

   const contratosFiltrados = Contratos.contratos.filter((c) => datosRango(c.fecha));
   const contratosActivos = contratosFiltrados.filter((c) => c.estado === "activo").length;

   const eventosFiltrados = Eventos.eventos.filter((e) => datosRango(e.fecha));
   const eventosPendientes = eventosFiltrados.filter(e => e.estado === "pendiente").length;

   const edicionesFiltrados = Ediciones.ediciones.filter((e) => e.fecha);
   const ediciones = edicionesFiltrados.reduce((acc,e) => {
    if (e.estado === "en proceso" ) acc.enProceso++;
    if (e.estado === "pendiente") acc.pendiente++;
    return acc;
   }, { enProceso: 0, pendiente: 0})

    const datos = [
        {
            id: 1,
            titulo: "Ingresos del Mes",
            valor: "S/ " + ingresosTotales,
            balance: 4,
            icono: <RiMoneyDollarCircleLine size={32} />
        },
        {
            id: 2,
            titulo: "Contratos Activos",
            valor: contratosActivos,
            balance: 4,
            icono: <LuFileSpreadsheet size={32} />
        },
        {
            id: 3,
            titulo: "Eventos Pendientes",
            valor: eventosPendientes,
            balance: 4,
            icono: <LuCalendarDays size={32} />
        },
        {
            id: 4,
            titulo: "Ediciones en Proceso",
            valor: ediciones.pendiente,
            balance: 4,
            icono: <MdOutlineOndemandVideo size={32} />
        },
    ]



    return (
         <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-2.5">
                    {datos.map((dato) => (
                        <CardEstadistico
                            key={dato.id}
                            className="bg-white"
                            titulo={dato.titulo}
                            monto={dato.valor}
                            balance={dato.balance}
                            icono={dato.icono}
                        />
                    ))}
                </div>
    )
}