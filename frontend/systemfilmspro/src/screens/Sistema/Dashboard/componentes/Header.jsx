import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import { useState } from 'react'
import Calendario from '../../../../componentes/Calendario';
import { LuCalendarDays } from "react-icons/lu";
import Boton from '../../../../componentes/ui/Boton';


export default function HeaderDashboard({seleccion, setSeleccion}) {
    const [mostrar, setMostrar] = useState(false);


    return (
        <div className="w-full h-[60px] sticky top-0 backdrop-blur-2xl flex justify-between items-center relative ">
            <div className="w-auto flex flex-col">
                <h1 className="font-outfit text-3xl">Dashboard</h1>
                <p className="text-[15px] text-gray-600 font-inter">Resumen general de tu empresa de filmaciones</p>
            </div>
               
            <div className='flex justify-between items-center gap-4'>
               <div 
               onClick={() => setMostrar(!mostrar)}
               className='flex w-auto  items-center justify-center gap-3 p-2 bg-white rounded-md '>
                  <LuCalendarDays size={21} />

                 {seleccion.map((fecha) => (
                    <div key={fecha}>
                       {fecha.toLocaleDateString()}
                    </div>
                 ))}
               </div>
               

               <Boton
               color='primario'
               texto="Exportar"
               className='p-3'
               >

               </Boton>
            </div>

            {mostrar && (
              <div className='absolute right-0  top-1/1 z-10'>
                <Calendario seleccion={seleccion} setSeleccion={setSeleccion}/>
              </div>
            )}
        </div>

    )
}