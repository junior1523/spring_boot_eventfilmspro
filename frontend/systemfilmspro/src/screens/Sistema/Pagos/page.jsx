import Boton from "../../../componentes/ui/Boton";
import { IoAddSharp } from "react-icons/io5";
import Input from "../../../componentes/ui/Input";
import Tabla from "../../../componentes/Tabla";
import { useState, useEffect, useMemo } from "react";
import { LuDownload } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import CardEstadistico from "../../../componentes/ui/CardEstadistico";
import { MdAttachMoney } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { TiWarningOutline } from "react-icons/ti";
import { MdResetTv } from "react-icons/md";
import NuevoPago from "./componentes/NuevoPago";
import Header from "../../../componentes/Header";
import CardScreens from "../../../componentes/ui/CardScreens"

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [eventos, setEventos] = useState([])
  const [buscar, setBuscar] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [abrir, setAbrir] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/pagos.json").then(res => res.json()),
      fetch("/contratos.json").then(res => res.json()),
      fetch("/clientes.json").then(res => res.json()),
      fetch("/eventos.json").then(res => res.json())
    ])
      .then(([pagosData, contratosData, clientesData, eventosData]) => {
        setPagos(pagosData.pagos);
        setContratos(contratosData.contratos);
        setClientes(clientesData.clientes);
        setEventos(eventosData.eventos)
      })
      .catch(console.error);
  }, []);


  const columnas = [
    { id: "cliente", label: "Cliente" },
    { id: "monto", label: "Monto" },
    { id: "numeroPago", label: "Pagos" },
    { id: "metodoPago", label: "Metodo" },
    { id: "fechaPago", label: "Fecha" },
    { id: "estado", label: "Estado" }
  ];


  const datosTabla = useMemo(() => {
    return pagos.map((p) => {
      const cliente = clientes.find((c) => c.id === p.clienteId);
      const contrato = contratos.find((cn) => cn.id === p.contratoId);

      return {
        cliente: cliente.nombre,
        contrato: contrato.nombre,
        numeroPago: p.numeroPago,
        metodoPago: p.metodoPago,
        fechaPago: p.fechaPago,
        monto: p.monto,
        estado: p.estado,

      }
    })
  }, [pagos, clientes, contratos]);

  const datosTablaFiltrado = useMemo(() => {
    return datosTabla.filter((d) => d.cliente.toLowerCase().includes(buscar.toLowerCase()) && (d.estado.toLowerCase() === filtro || filtro === "todos"))
  }, [datosTabla, filtro, buscar])

  const resumen = pagos.reduce((acc, p) => {
    const estado = p.estado.toLowerCase();

    acc.total += p.monto;

    if (estado === "pagado") acc.recibido += p.monto;
    if (estado === "pendiente") acc.pendiente += p.monto;
    if (estado === "deuda") acc.vencido++;

    return acc;
  }, {
    total: 0,
    recibido: 0,
    pendiente: 0,
    vencido: 0
  });


  const datos = [
    {
      id: 1,
      icono: <MdAttachMoney size={25} className="text-green-600" />,
      titulo: "Total Recibido",
      monto: `S/ ${resumen.recibido.toLocaleString()}`,
      className: "bg-green-100 text-green-700"
    },
    {
      id: 2,
      icono: <LuFileSpreadsheet className="text-orange-500" size={25} />,
      titulo: "Pendiente",
      monto: `S/ ${resumen.pendiente.toLocaleString()}`,
      className: "bg-orange-100 text-orange-700"
    },
    {
      id: 3,
      icono: <TiWarningOutline size={25} />,
      titulo: "Vencido",
      monto: resumen.vencido,
      className: "bg-red-100 text-red-700"
    },
    {
      id: 4,
      icono: <MdResetTv size={25} />,
      titulo: "Total Esperado",
      monto: `S/ ${resumen.total.toLocaleString()}`,
      className: "bg-blue-100 text-blue-700"
    }
  ];


  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] h-[95%]">

        <Header
          titulo="Pagos"
          descripcion="Gestiona los pagos de contratos"
          textoBoton="Nuevo Pago"
          onNuevo={() => setAbrir(true)}
        />

        <NuevoPago
          abrir={abrir}
           contratos={contratos}
           clientes={clientes}
           cerrar={()=> setAbrir(!abrir)}
        />



        <div className="flex gap-4 mt-6 flex-wrap">
          {datos.map((d) => (
            <CardScreens
              key={d.id}
              icono={d.icono}
              texto={d.titulo}
              monto={d.monto}
              colorIcon={d.className}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <Input
            onChange={(e) => setBuscar(e.target.value)}
            placeholder="Buscar cliente o método..."
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border rounded-md px-3"
          >
            <option value="todos">Todos</option>
            <option value="pagado">Pagado</option>
            <option value="pendiente">Pendiente</option>
            <option value="deuda">Deuda</option>
          </select>
        </div>


        <div className="mt-8">
          <Tabla datos={datosTablaFiltrado} columnas={columnas} />
        </div>
      </div>
    </div>
  );
}