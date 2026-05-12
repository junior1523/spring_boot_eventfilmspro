import { useEffect, useState } from "react";
import Input from "../../../componentes/ui/Input";
import Boton from "../../../componentes/BotonTema"
import { IoAddSharp } from "react-icons/io5";
import Tabla from "../../../componentes/Tabla";
import { Tab } from "@headlessui/react";
import CardsEdiciones from "./componentes/almacenamiento/CardsEdiciones";
import PanelAlmacenados from "./componentes/almacenamiento/PanelAlmacenados";
import NuevaEdicion from "./componentes/almacenamiento/NuevaEdicion";
import TabEdicion from "./componentes/Ediciones/TabEdicion";
import { MdOndemandVideo } from "react-icons/md";
import { FaSquarespace } from "react-icons/fa6";
import Header from "../../../componentes/Header";

export default function Ediciones() {
  const [eventos, setEventos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/eventos.json").then(res => res.json()),
      fetch("/clientes.json").then(res => res.json())
    ]).then(([eventosData, clientesData]) => {
      setEventos(eventosData.eventos);
      setClientes(clientesData.clientes);
    });
  }, []);

  const filtrados = eventos.filter((e) =>
    e.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  const handleGuardar = (nuevaEdicion) => {
    setEventos((prev) => [...prev, nuevaEdicion]);
  };

  const columnas = [
    { id: "nombre", label: "Evento" },
    { id: "cliente", label: "Cliente" },
    { id: "fecha", label: "Fecha" },
    { id: "lugar", label: "Lugar" },
    { id: "estado", label: "Estado" }
  ];

  const datosTabla = filtrados.map((e) => ({
    nombre: e.nombre,
    cliente: e.cliente || "Sin cliente",
    fecha: e.fecha,
    lugar: e.lugar,
    estado: e.estado
  }));

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] h-[96%]">

        <Header
        onNuevo={() => setDrawer(!drawer)}
        textoBoton="Nueva edicin"
        descripcion="Gestiona tus ediciones"
        titulo="Ediciones"/> 

        <CardsEdiciones eventos={eventos} />

        <NuevaEdicion
          abierto={drawer}
          cerrar={() => setDrawer(false)}
          clientes={clientes}
          eventos={eventos}
          onGuardar={handleGuardar}
        />

        <Tab.Group>
          <Tab.List className="flex gap-6 border-b border-b-gray-400 mt-12">

            <Tab className={({ selected }) =>
              `pb-2 text-sm font-medium ${selected
                ? "border-b-2 border-indigo-500 text-indigo-600 outline-none"
                : "text-gray-500"
              }`
            }>
              <div className="flex items-center justify-between gap-2">
                <FaSquarespace size={25} />
                Almacenamiento
              </div>
            </Tab>

            <Tab className={({ selected }) =>
              `pb-2 text-sm font-medium ${selected
                ? "border-b-2 border-indigo-500 text-indigo-600 outline-none"
                : "text-gray-500"
              }`
            }>
              <div className="flex items-center justify-between gap-2">
                <MdOndemandVideo size={25} />
                Almacenamiento
              </div>
            </Tab>

          </Tab.List>

          <Tab.Panels className="mt-4">

            <Tab.Panel>



              <div className="mt-6 flex justify-between">
                <Input
                  placeholder="Buscar por Evento o Cliente..."
                  onChange={(e) => setBuscar(e.target.value)}
                />

                <select className="border rounded-md px-3">
                  <option>Todos</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <Tabla datos={datosTabla} columnas={columnas} />
                </div>

                <PanelAlmacenados />
              </div>

            </Tab.Panel>

            <Tab.Panel>
              <TabEdicion eventos={filtrados} />
            </Tab.Panel>

          </Tab.Panels>

        </Tab.Group>

      </div>
    </div>
  );
}