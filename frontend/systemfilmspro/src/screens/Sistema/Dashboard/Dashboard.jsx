import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import HeaderDashboard from "./componentes/Header";
import CardsDashboard from "./componentes/Cards";
import Ingresos from "../../../utilidades/ingresos.json";
import GraficoDashboard from "./componentes/GraficoDashboard";
import PolarChart from "./componentes/PolarChart";
import ColumnaCHart from "./componentes/ColumaChart";
import Tabla from "../../../componentes/Tabla";
import TablaDashboard from "./componentes/Tabla";


export default function Dashboard() {
    const [seleccion, setSeleccion] = useState([]);
    const [mostrarCortina, setMostrarCortina] = useState(false);

    useEffect(() => {
        const yaMostrada = sessionStorage.getItem("cortinaMostrada");

        if (!yaMostrada) {
            sessionStorage.setItem("cortinaMostrada", "true");

            setTimeout(() => {
                setMostrarCortina(true);

                setTimeout(() => {
                    setMostrarCortina(false);
                }, 800);

            }, 0);
        }
    }, []);

    return (
        <>
            {mostrarCortina && (
                <div className="fixed inset-0 z-50 flex">

                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: 2 }}
                        className="w-1/2 h-full bg-white"
                    />

                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2 }}
                        className="w-1/2 h-full bg-white"
                    />

                </div>
            )}


            <div className="w-full h-full light:bg-white flex justify-center items-center dark:bg-black">
                <div className="w-[90%] h-[95%]">
                    <HeaderDashboard seleccion={seleccion} setSeleccion={setSeleccion} />

                    <div>
                        < CardsDashboard seleccion={seleccion} />
                    </div>

                    <div className="flex mt-8 gap-8">
                        <div className="md:w-[500px] lg:w-[700px] bg-white p-3">
                            <GraficoDashboard
                                seleccion={seleccion}
                            />
                        </div>
                        <div className="md:w-[350px]  lg:w-[700px] bg-white p-3">
                            <ColumnaCHart seleccion={seleccion} />
                        </div>
                    </div>

                    <div className="mt-7 bg-white p-5 rounded-md">
                        <TablaDashboard />
                    </div>
                </div>

            </div>

        </>


    )
}