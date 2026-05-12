import { useState, useEffect } from "react";
import Input from "../../../../componentes/ui/Input";
import ClientesForm from "./ClientesForm";
import EventosForm from "./EventosForm";
import RangoFilmacionForm from "./RangoForm";
import PagosFormContratos from "./PagosForm";

export default function ContratoForm({
  initialData = {},
  onSubmit,
  clientes
}) {
  const [form, setForm] = useState({
    cliente: {},
    evento: {},
    filmacion: {},
    pagos: [],
    observaciones: "",
    ...initialData
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...initialData
    }));
  }, [initialData]);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <ClientesForm
        contratoEdicion={form}
        setContratoEdicion={setForm}
        clientes={clientes}
      />

      <EventosForm
        contratoEdicion={form}
        setContratoEdicion={setForm}
      />

      <RangoFilmacionForm
        contratoEdicion={form}
        setContratoEdicion={setForm}
      />

      <PagosFormContratos
        contratoEdicion={form}
        setContratoEdicion={setForm}
      />

      <div>
        <h3 className="font-semibold mb-2">Observaciones</h3>
        <textarea
          className="w-full bg-gray-200 p-2 rounded"
          value={form.observaciones || ""}
          onChange={(e) =>
            handleChange("observaciones", e.target.value)
          }
        />
      </div>

      <button className="bg-blue-600 text-white py-2 rounded-lg">
        Guardar
      </button>
    </form>
  );
}