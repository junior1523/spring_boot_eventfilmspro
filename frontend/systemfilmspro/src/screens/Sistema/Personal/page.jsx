import Boton from "../../../componentes/ui/Boton";
import { IoAddSharp } from "react-icons/io5";
import Input from "../../../componentes/ui/Input";
import Tabla from "../../../componentes/Tabla";
import { useState, useEffect, useMemo } from "react";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Card from "../../../componentes/ui/Card";
import { FaRegUser } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import Header from "../../../componentes/Header";
import CardScreens from "../../../componentes/ui/CardScreens";

export default function Personal() {
  const [personal, setPersonal] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [ buscar, setBuscar] = useState("")

  useEffect(() => {
    fetch("/personal.json")
      .then(res => res.json())
      .then(data => setPersonal(data.personal))
      .catch(console.error);
  }, []);

   const personalFiltrado = useMemo(() => {
    return personal.filter((p) => (
      p.nombre.toLowerCase().includes(buscar.toLowerCase())
    ) && ( p.disponibilidad.toLowerCase() === filtro || filtro === "todos"))
   }, [personal, buscar, filtro])

   const datosCards = useMemo(() => {
     return personal.reduce((acc,p) => {
      if (p.id) acc.Total++;
      if (p.disponibilidad.toLowerCase() === "disponible") acc.Disponible++;
      if (p.disponibilidad.toLowerCase() === "ocupado") acc.Ocupado++;
      return acc; 
     }, {Total: 0, Disponible: 0, Ocupado: 0})
   }, [personal]);

  

   const datosOrdenados = [
    {
      id: 1,
      titulo: "Total Personal",
      cantidad: datosCards.Total,
      icono: <FaRegUser size={26} className="text-green-800" />,
      color: "bg-green-200 text-black"
    },
    {
      id: 2,
      titulo: "Disponible",
      cantidad: datosCards.Disponible,
      icono: <LuFileSpreadsheet  size={26}  className="text-red-800" />,
      color: "bg-red-200 text-black"
    },
    {
      id: 3,
      titulo: "Ocupado",
      cantidad: datosCards.Ocupado,
      icono: <IoWarningOutline  size={26}  className="text-orange-800"/>,
      color: "bg-orange-200 text-black"
    },
   ]


  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] h-[95%]">

        <Header 
        descripcion="Gestiona tu equipo de trabajo"
        titulo="Personal"
        textoBoton="Personal"
        />

        <div className="cards gap-8 flex justify-start">
          {datosOrdenados.map((d, i) => (
            <div key={i}>
              <CardScreens
              icono={d.icono}
              texto={d.titulo}
              monto={d.cantidad}
              colorIcon={`${d.color}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <Input
          onChange={(e) => setBuscar(e.target.value)}
            placeholder="Buscar por nombre o rol..."
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border rounded-md px-3"
          >
            <option value="todos">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="ocupado">Ocupado</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-8 mt-12">
          {personalFiltrado.map((p) => (
            <div key={p.id}>
              <Card
                imagen={p.imagen}
                rol={p.rol}
                disponibilidad={p.disponibilidad}
                nombre={p.nombre}
                rating={p.rating}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}