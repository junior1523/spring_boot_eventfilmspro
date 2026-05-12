import {  useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = [
    "Dom", "Lun", "Mar", "Miér", "Jue", "Vie", "Sáb"
];

export default function Calendario({seleccion, setSeleccion}) {
    const [fecha, setFecha] = useState(new Date());
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const primerDiaMes = new Date(año, mes, 1).getDay();
    const totalDiasMes = new Date(año, mes + 1, 0).getDate();

    const dias = []
    for (let i = 0; i < primerDiaMes; i++) {
        dias.push(null)
    }
    for (let i = 1; i <= totalDiasMes; i++) {
        dias.push(i)
    }

    const mesSiguiente = () => {
        setFecha(new Date(año, mes + 1, 1))
    }

    const mesAnterior = () => {
        setFecha(new Date(año, mes - 1, 1))
    }

   const seleccionarDia = (dia) => {
    if (!dia) return;

    const fechaSeleccionada = new Date(año, mes, dia);

    if (seleccion.length === 0) {
        setSeleccion([fechaSeleccionada]);

    } else if (seleccion.length === 1) {
        const inicio = seleccion[0];
        const mismaFecha =
            inicio.getFullYear() === fechaSeleccionada.getFullYear() &&
            inicio.getMonth() === fechaSeleccionada.getMonth() &&
            inicio.getDate() === fechaSeleccionada.getDate();

        if (mismaFecha) {
            setSeleccion([]);
        } else {
            setSeleccion(inicio > fechaSeleccionada
                ? [fechaSeleccionada, inicio]
                : [inicio, fechaSeleccionada]
            );
        }
    } else {

        setSeleccion([fechaSeleccionada]);
    }
};



    const estaEnRango = (dia) => {
        if (!dia) return false;

        const fechaSeleccionada = new Date(año, mes, dia);
        const inicio = seleccion[0];
        const fin = seleccion[1] ?? seleccion[0];
        return fechaSeleccionada >= inicio && fechaSeleccionada <= fin;
    }


    return (
        <div className="max-w-[400px] bg-white p-4">
            <div className="w-full flex justify-between gap-2">
                <div>
                    <h3 className="font-outfit text-[20px] text-gray-600"><span className="text-black">{meses[mes]}</span> {año}</h3>
                </div>

                <div className="rounded border border-gray-400 flex justify-between items-center gap-5 ">
                    <IoIosArrowBack 
                    onClick={mesAnterior}
                    className="hover:text-gray-500" />
                    <IoIosArrowForward
                    onClick={mesSiguiente}
                    className="hover:text-gray-500" />
                </div>

            </div>
            <div className="grid mt-4 rounded-md grid-cols-7 gap-2">
                {diasSemana.map((dia) => (
                    <div key={dia}>
                        {dia}
                    </div>
                ))}

                {dias.map((dia, i) => {
                    const seleccionado = seleccion.some(
                        (f) => f.getFullYear() === año && f.getMonth() === mes && f.getDate() === dia
                    )

                    return (
                        <div
                            onClick={() => seleccionarDia(dia)}
                            className={`
                                text-center rounded-md
                        ${estaEnRango(dia) ? "bg-indigo-400 text-white" : ""}
                        ${seleccionado ? "bg-indigo-600 text-white font-bold" : ""}`}
                            key={i}>
                            {dia}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}