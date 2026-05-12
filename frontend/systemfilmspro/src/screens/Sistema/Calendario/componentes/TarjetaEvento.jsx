import { COLORES_POR_TIPO, HORA_INICIO, PIXELES_POR_MINUTO, ALTURA_HEADER_DIA } from "../../../../utilidades/constantes/datosConstantes";
import { useState } from "react";
import TooltipEvento from "./TooltipEvento";
import ModalEvento from "./modalEvento";


const aMinutos = (hora) => {
   const [h, m] = hora.split(":").map(Number);
   return h * 60 + m;
};


export default function TarjetaEvento({ evento }) {
   const [modalAbierto, setModalAbierto] = useState(false);

   const inicio = aMinutos(evento.horaInicio);
   const fin    = aMinutos(evento.horaFin);

   const top    = (inicio - HORA_INICIO) * PIXELES_POR_MINUTO + ALTURA_HEADER_DIA;
   const height = Math.max((fin - inicio) * PIXELES_POR_MINUTO, 22);

   const colores       = COLORES_POR_TIPO[evento.tipo] || COLORES_POR_TIPO.default;
   const pequeño       = height < 40;
   const columna       = evento.columna      ?? 0;
   const totalColumnas = evento.totalColumnas ?? 1;
   const anchoPct      = 100 / totalColumnas;
   const leftPct       = anchoPct * columna;
   const GAP           = 2;

   return (
      <>
         <div
            className="absolute rounded-md overflow-visible"
            style={{
               top,
               height,
               left:  `calc(${leftPct}% + ${columna === 0 ? 4 : GAP}px)`,
               width: `calc(${anchoPct}% - ${columna === 0 ? 4 + GAP : GAP * 2}px)`,
               zIndex: 10 + columna,
            }}
         >
            <TooltipEvento evento={evento}>
               <div
                  onClick={() => setModalAbierto(true)}
                  className="w-full h-full rounded-md overflow-hidden cursor-pointer transition-all duration-150 hover:brightness-105 hover:shadow-md"
                  style={{
                     backgroundColor: colores.bg,
                     borderLeft: `3px solid ${colores.border}`,
                  }}
               >
                  <div className="px-1.5 py-1 h-full flex flex-col justify-start overflow-hidden">
                     <p
                        className="font-semibold leading-tight truncate"
                        style={{ color: "#fff", fontSize: pequeño ? 9 : 11 }}
                     >
                        {evento.nombre}
                     </p>
                     {!pequeño && (
                        <p
                           className="truncate opacity-80"
                           style={{ color: "#fff", fontSize: 9, marginTop: 1 }}
                        >
                           {evento.horaInicio}–{evento.horaFin}
                        </p>
                     )}
                  </div>
               </div>
            </TooltipEvento>
         </div>

         {modalAbierto && (
            <ModalEvento
               evento={evento}
               onCerrar={() => setModalAbierto(false)}
            />
         )}
      </>
   );
}