import Input from "../../../componentes/ui/Input";
import CardsContratos from "./componentes/CardsContratos";
import Tabla from "../../../componentes/Tabla";
import useContratos from "../../../hooks/useContratos";
import { useMemo, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import Header from "../../../componentes/Header";
import Drawer from "../../../componentes/drawer";
import ContratoForm from "./componentes/ContratoForm";

export default function Contratos() {
  const [abrir, setAbrir] = useState(false);

  const {
    contratos,
    buscar,
    setBuscar,
    filtro,
    setFiltro,
    contratoEdicion,
    setContratoEdicion,
    datosTablaFIltrado,
    actualizarContrato,
    clientes
  } = useContratos();

  const modoEdicion = !!contratoEdicion;

  const abrirNuevo = () => {
    setContratoEdicion(null);
    setAbrir(true);
  };

  const cerrarDrawer = () => {
    setAbrir(false);
    setContratoEdicion(null);
  };

  const columnas = useMemo(() => [
    { id: "evento", label: "Evento" },
    { id: "tipo", label: "Tipo" },
    { id: "fecha", label: "Fecha" },
    { id: "monto", label: "Monto" },
    { id: "estado", label: "Estado" },
    { id: "clienteNombre", label: "Cliente" },
    {
      id: "acciones",
      label: "Acciones",
      render: (dato) => (
        <div className="flex gap-2 justify-center">
          <button className="text-green-600 hover:text-green-800">
            <LuDownload size={20} />
          </button>

          <button
            className="text-gray-500 hover:text-gray-900"
            onClick={() => setContratoEdicion(dato)}
          >
            <FaRegEdit size={20} />
          </button>

          <button className="text-blue-600 hover:text-blue-300">
            <FaRegEye size={20} />
          </button>

          <button className="text-red-500 hover:text-red-700">
            <MdDeleteOutline size={20} />
          </button>
        </div>
      )
    }
  ], [setContratoEdicion]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] h-[95%]">

        <Header
          titulo="Contratos"
          descripcion="Gestiona tus pagos"
          onNuevo={abrirNuevo}
        />


        <Drawer
          abierto={abrir || modoEdicion}
          cerrar={cerrarDrawer}
          titulo={modoEdicion ? "Editar contrato" : "Nuevo contrato"}
        >
          <ContratoForm
            initialData={contratoEdicion || {}}
            clientes={clientes}
            onSubmit={(data) => {
              if (modoEdicion) {
                actualizarContrato(data);
              } else {
                console.log("crear", data);
              }

              cerrarDrawer();
            }}
          />
        </Drawer>



        <div className="mt-9">
          <CardsContratos contratos={contratos} />
        </div>

        <div className="flex justify-between mt-12">
          <div className="flex flex-col gap-2">
            <label className="font-outfit">Buscar Contratos:</label>
            <Input
              placeholder={"Buscar..."}
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>

        <div className="mt-11">
          <Tabla datos={datosTablaFIltrado} columnas={columnas} />

        </div>



      </div>
    </div>
  );
}