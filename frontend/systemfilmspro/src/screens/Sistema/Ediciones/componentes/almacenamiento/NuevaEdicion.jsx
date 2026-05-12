import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SeleccionarCliente from "../../../../../componentes/SelectClientes"
import SeleccionarEvento from "../../../../../componentes/SeleccionarEvento"
import Input from "../../../../../componentes/ui/Input";

export default function NuevaEdicion({ abierto, cerrar, clientes, eventos, onGuardar }) {
  const [form, setForm] = useState({
    cliente: null,
    evento: null,
    fecha: "",
    estado: "pendiente"
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nueva = {
      id: Date.now(),
      nombre: form.evento?.nombre,
      clienteId: form.cliente?.id,
      fecha: form.fecha,
      estado: form.estado,
      lugar: form.evento?.lugar
    };

    onGuardar(nueva);
    cerrar();
  };

  return (
    <AnimatePresence>
      {abierto && (
        <>

          <motion.div
            onClick={cerrar}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-0 right-0 h-screen w-[400px] bg-white z-50 shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <div className="p-5 flex flex-col h-full">

              <div className="flex justify-between mb-5">
                <h2 className="text-xl font-semibold">Nueva Edición</h2>
                <button onClick={cerrar}>✕</button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <SeleccionarCliente
                  clientes={clientes}
                  onChange={(c) => setForm({ ...form, cliente: c })}
                />

                <SeleccionarEvento
                  eventos={eventos}
                  onChange={(e) => setForm({ ...form, evento: e })}
                />

                <Input
                  type="date"
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                />

                <select
                  className="border rounded-md p-2"
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="enedicion">En edición</option>
                  <option value="confirmado">Confirmado</option>
                </select>

                <div className="mt-auto flex justify-end gap-2">
                  <button type="button" onClick={cerrar}>
                    Cancelar
                  </button>

                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    Guardar
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}