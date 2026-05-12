import { useEffect, useMemo, useState } from "react";
import Tabla from "../../../../../componentes/Tabla";
import CardEdicion from "./CardEdicion";

export default function TabEdicion({ eventos }) {

  const [ediciones, setEdiciones] = useState([]);

  useEffect(() => {
    fetch("/ediciones.json")
      .then(res => res.json())
      .then(data => setEdiciones(data.ediciones))
      .catch(console.error);
  }, []);

  const dataUnida = useMemo(() => {
    return ediciones.map((ed) => {
      const evento = eventos.find(e => e.id === ed.eventoId);

      return {
        nombre: evento?.nombre || "Sin evento",
        tipo: evento?.tipo || "-",
        lugar: evento?.lugar || "-",
        fecha: evento?.fecha || "-",
        archivo: ed.archivoUrl ? "Disponible" : "Pendiente",
        estado: ed.estado,
      };
    });
  }, [ediciones, eventos]);

  const columnas = [
    { id: "nombre", label: "Evento" },
    { id: "tipo", label: "Tipo" },
    { id: "lugar", label: "Lugar" },
    { id: "fecha", label: "Fecha" },
    { id: "archivo", label: "Archivo" },
    { id: "estado", label: "Estado" },
  ];

  return (
    <div className="mt-6 space-y-6">

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          PANEL DE EDICIÓN
        </h3>

        <Tabla datos={dataUnida} columnas={columnas} />
      </div>

      <div
        className="
        grid 
        grid-cols-[repeat(auto-fill,minmax(240px,1fr))] 
        gap-5
      "
      >
        {ediciones.map((ed) => {
          const evento = eventos.find(e => e.id === ed.eventoId);

          return (
            <CardEdicion
              key={ed.id}
              evento={evento}
              edicion={ed}
            />
          );
        })}
      </div>

    </div>
  );
}