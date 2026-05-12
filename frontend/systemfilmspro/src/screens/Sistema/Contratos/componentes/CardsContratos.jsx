
import { MdAttachMoney } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import { CiMoneyCheck1 } from "react-icons/ci";
import CardScreens from "../../../../componentes/ui/CardScreens";

export default function CardsContratos({ contratos }) {

  const totalContratos = contratos.reduce((acc, c) => {
    if (c.eventoId) acc.total++;
    if (c.estado === "activo") acc.activos++;
    if (c.estado === "pendiente") acc.pendiente++;
    acc.monto += c.monto;
    return acc;
  }, { total: 0, activos: 0, pendiente: 0, monto: 0 });

  const datos = [
    {
      id: 1,
      icono: <MdAttachMoney size={26} />,
      texto: "Total",
      monto: totalContratos.total,
      color: "bg-blue-50 text-blue-700"
    },
    {
      id: 2,
      icono: <LuFileSpreadsheet size={26} />,
      texto: "Activos",
      monto: totalContratos.activos,
      color: "bg-green-50 text-green-700"
    },
    {
      id: 3,
      icono: <IoWarningOutline size={26} />,
      texto: "Pendientes",
      monto: totalContratos.pendiente,
      color: "bg-red-50 text-red-700"
    },
    {
      id: 4,
      icono: <CiMoneyCheck1 size={26}  />,
      texto: "Valor Total",
      monto: totalContratos.monto,
      color: "bg-purple-50 text-purple-700"
    },
  ];

  return (
    <div className="flex gap-6 items-start">
      {datos.map((d) => (
        <CardScreens
          key={d.id}
          className={`  transition`}
          icono={d.icono}
          texto={d.texto}
          monto={d.monto}
          colorIcon={d.color}
        />
      ))}
    </div>
  );
}