import { HORAS, ALTURA_HEADER_DIA } from "../../../../utilidades/constantes/datosConstantes";

export default function ColumnaHoras() {
   return (
      <div
         className="flex-shrink-0 select-none"
         style={{ width: 56, paddingTop: ALTURA_HEADER_DIA }}
      >
         {HORAS.map((h) => (
            <div
               key={h}
               className="relative"
               style={{ height: 60 }}
            >
               <span
                  className="absolute -top-2.5 right-2 text-[10px] font-medium tabular-nums"
                  style={{ color: "#94a3b8" }}
               >
                  {h}
               </span>
            </div>
         ))}
      </div>
   );
}