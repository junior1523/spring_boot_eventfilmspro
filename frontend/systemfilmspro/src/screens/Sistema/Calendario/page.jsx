import CalendarioEventos from "./componentes/Calendario";
import FiltroEventos from "./componentes/filtroEventos";
import { useTiposEventos } from "../../../hooks/useTiposEventos";
import { useState } from "react";

import {useHorarios} from "../../../hooks/useHorarios"
import AgendaSemana from "./componentes/AgendaSemanal";

export default function CalendarioScreen() {
   const {tipoEventos} = useTiposEventos();
   const { horarios } = useHorarios();
   const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
   const [filtros,setFiltros] = useState([]);

   const eventosFiltrados = (horarios || []).filter(e =>
   filtros.length === 0 || filtros.includes(e.tipo)
);

   return (
      <div className="w-full flex justify-center items-center">
         <div className="w-[90%] h-[95%] gap-4 flex justify-between">
            <div className="w-[30%] bg-white">
               <CalendarioEventos
               fechaSeleccionada={fechaSeleccionada}
               setFechaSeleccionada={setFechaSeleccionada}
               />

                <div className="px-5">
                  <FiltroEventos 
                  filtros={filtros}
                  setFiltros={setFiltros}
                  tiposEventos={tipoEventos}/>
                </div>
            </div>

            <div className="w-[70%]">
              <AgendaSemana
              fechaSeleccionada={fechaSeleccionada}
              horarios={eventosFiltrados}
              />
            </div>
         </div>
      </div>
   )
}