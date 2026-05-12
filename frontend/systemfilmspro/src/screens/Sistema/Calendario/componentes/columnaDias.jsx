import { HORAS, ALTURA_HEADER_DIA } from "../../../../utilidades/constantes/datosConstantes";
import TarjetaEvento from "./TarjetaEvento";
import { formatearFechaISO } from "../../../../utilidades/formatearFecha";
import { calcularColumnas } from "./calcularColumnas";


export default function ColumnaDia({ dia, esSeleccionado, esHoy, horarios }) {
   const fechaStr = formatearFechaISO(dia);
   const eventosDelDia = calcularColumnas(
      (horarios || []).filter((e) => e.fecha === fechaStr)
   );

   const nombreDia = dia.toLocaleDateString("es-PE", { weekday: "short" });
   const numeroDia = dia.toLocaleDateString("es-PE", { day: "numeric" });

   return (
      <div
         className="flex-1 border-l relative min-w-0"
         style={{ borderColor: "#e2e8f0" }}
      >

         <div
            className="sticky top-0 z-20 flex flex-col items-center justify-center border-b select-none"
            style={{
               height: ALTURA_HEADER_DIA,
               borderColor: "#e2e8f0",
               backgroundColor: esSeleccionado ? "#eef2ff" : "#fff",
            }}
         >
            <span
               className="uppercase tracking-wide"
               style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: esHoy ? "#6366f1" : "#94a3b8",
               }}
            >
               {nombreDia}
            </span>

            <span
               className="flex items-center justify-center rounded-full font-bold tabular-nums"
               style={{
                  width: 28,
                  height: 28,
                  fontSize: 13,
                  marginTop: 2,
                  color: esHoy ? "#fff" : esSeleccionado ? "#6366f1" : "#334155",
                  backgroundColor: esHoy ? "#6366f1" : "transparent",
               }}
            >
               {numeroDia}
            </span>
         </div>

         {HORAS.map((h) => (
            <div
               key={h}
               style={{
                  height: 60,
                  borderBottom: "1px solid #f1f5f9",
                  backgroundColor: esSeleccionado ? "#f8f8ff" : "transparent",
               }}
            />
         ))}

         {eventosDelDia.map((e) => (
            <TarjetaEvento key={e.id} evento={e} />
         ))}
      </div>
   );
}