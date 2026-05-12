import { diasMes } from "../../../../utilidades/calendario/calendario"
import { DIAS_SEMANA } from "../../../../utilidades/constantes/datosConstantes"
import { fechaActual } from "../../../../utilidades/calendario/calendario"
import { MESES } from "../../../../utilidades/constantes/datosConstantes";
import { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CalendarioEventos({fechaSeleccionada, setFechaSeleccionada}) {

    const [fecha, setFecha] = useState(fechaActual());


    const { año, mes } = fecha;
    const dias = diasMes({ año, mes })

    const mesAnterior = (direccion) => {
        const nuevaFecha = new Date(año, mes + direccion, 1);

        setFecha({
            año: nuevaFecha.getFullYear(),
            mes: nuevaFecha.getMonth()
        })
    }

    const seleciconarFecha = (dia) => {
        if (!dia) return;

        setFechaSeleccionada(new Date(año, mes, dia))
    }

    return (
        <div className="bg-white p-3 rounded-md">
            <div className="flex justify-between border-b py-2 border-b-gray-400">
                <IoIosArrowBack size={24} onClick={() => mesAnterior(-1)} />

                <h3 className="font-inter text-gray-700"> {MESES[mes]} {año}</h3>
                <IoIosArrowForward size={24} onClick={() => mesAnterior(+1)} />
            </div>

            <div className="grid grid-cols-7 gap-2 py-2 font-outfit">
                {DIAS_SEMANA.map((d) => (
                    <div key={d}>
                        {d}
                    </div>
                ))}

                {dias.map((d, i) => {
                    const seleccionado =
                        fechaSeleccionada &&
                        d &&
                        fechaSeleccionada.getFullYear() === año &&
                        fechaSeleccionada.getMonth() === mes &&
                        fechaSeleccionada.getDate() === d;

                    return (
                        <div
                            className={`
                                text-center rounded-md
                                ${seleccionado ? "bg-indigo-500 text-white fom" : "bg-white"}`}
                            onClick={() => seleciconarFecha(d)}
                            key={i}>
                            {d}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}