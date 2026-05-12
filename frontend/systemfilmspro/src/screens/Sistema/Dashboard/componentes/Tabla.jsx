import { useState, useEffect, useMemo } from "react";
import Tabla from "../../../../componentes/Tabla";
import Input from "../../../../componentes/ui/Input";


export default function TablaDashboard() {
  const [filtro, setFiltro] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [eventos, setEventos] = useState([]);
  const [clientes, setClientes] = useState([])

  useEffect(() => {
  Promise.all([
    fetch("/eventos.json").then(res => res.json()),
    fetch("/clientes.json").then(res => res.json())
  ])
  .then(([eventosData, clientesData]) => {
    setEventos(eventosData.eventos);
    setClientes(clientesData.clientes);
  })
  .catch(err => console.log(err));
}, []);



  const dataTabla = useMemo(() => {
    return eventos.map((e) => {
       const cliente = clientes.find(c => c.id === (e.cliente_id ?? e.clienteId));

      return {
        evento: e.nombre,
        cliente: cliente?.nombre ?? "—",
        tipo: e.tipo,
        fecha: e.fecha,
        estado: e.estado
      }
    })
  }, [eventos, clientes])

  const columnas = [
    { id: "evento", label: "Evento"},
    { id: "cliente", label: "cliente"},
    { id: "tipo", label: "Tipo" },
    { id: "fecha", label: "Fecha" },
    { id: "estado", label: "Estado" }
  ]


  const eventosFiltrados = dataTabla.filter((e) => (
    (e.tipo.toLowerCase().includes(filtro.toLowerCase())) &&
    (filtroEstado === "" || filtroEstado === "todos" || filtroEstado === e.estado.toLowerCase())
  ));


  return (
    <div className="mt-4">
      <h2 className="font-outfit text-[24px]">Eventos Recientes</h2>
      <div className="w-full flex justify-between items-center mt-9">
        <Input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Ingrese algo" />

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="completado">Completado</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>
      <div className={`mt-7 transition-opacity duration-300 opacity-100`}>
         <Tabla columnas={columnas} datos={eventosFiltrados} />
      </div>
    </div>
  )
}