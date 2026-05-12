import CardScreen from "../../../../../componentes/ui/CardScreens";
import { FaRegUser } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";

export default function CardsEdiciones({ eventos }) {

  const resumen = eventos.reduce((acc, e) => {
    acc.total++;

    if (e.estado === "En proceso") acc.proceso++;
    if (e.estado === "Pendiente") acc.pendiente++;
    if (e.estado === "Completado") acc.completado++;

    return acc;
  }, { total: 0, proceso: 0, pendiente: 0, completado: 0 });

  const data = [
    {
      titulo: "Total Ediciones",
      monto: resumen.total,
      icono: <FaRegUser size={32}  className="text-green-600" />,
      className: "bg-green-100"
    },
    {
      titulo: "En Proceso",
      monto: resumen.proceso,
      icono: <LuFileSpreadsheet size={32} className="text-yellow-600" />,
      className: "bg-yellow-100"
    },
    {
      titulo: "Pendientes",
      monto: resumen.pendiente,
      icono: <IoWarningOutline size={32}  className="text-red-600" />,
      className: "bg-red-100"
    },
    {
      titulo: "Completados",
      monto: resumen.completado,
      icono: <MdOutlineVideoLibrary size={32}  className="text-indigo-600" />,
      className: "bg-indigo-100"
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {data.map((d, i) => (
        <CardScreen
          key={i}
          icono={d.icono}
          texto={d.titulo}
          monto={d.monto}
          colorIcon={d.className}
        />
      ))}
    </div>
  );
}