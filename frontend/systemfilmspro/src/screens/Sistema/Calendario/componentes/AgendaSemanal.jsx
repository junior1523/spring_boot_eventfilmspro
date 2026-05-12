import {useSemana} from "../../../../hooks/useSemana"
import ColumnaHoras from "./columnasHoras";
import ColumnaDia from "./columnaDias";

export default function AgendaSemana({ horarios, fechaSeleccionada }) {
   const { diasSemana, esHoy, esSeleccionado } = useSemana(fechaSeleccionada);

   return (
      <div
         className="flex w-full overflow-auto"
         style={{
            fontFamily: "'DM Sans', sans-serif",
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            maxHeight: "80vh",
         }}
      >
         <ColumnaHoras />

         <div className="flex flex-1 min-w-0">
            {diasSemana.map((dia, i) => (
               <ColumnaDia
                  key={i}
                  dia={dia}
                  esSeleccionado={esSeleccionado(dia)}
                  esHoy={esHoy(dia)}
                  horarios={horarios}
               />
            ))}
         </div>
      </div>
   );
}