import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react";
import { useState } from "react";
import { FaCheck, FaCaretDown } from "react-icons/fa6";

export default function SeleccionarCliente({ clientes = [] }) {

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtrarclientes =
    query === ""
      ? clientes
      : clientes.filter((cliente) =>
          cliente.nombre.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full max-w-sm">

      <Combobox
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >

        {/* INPUT */}
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Seleccionar cliente..."
            displayValue={(cliente) => cliente?.nombre || ""}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* ICON */}
          <ComboboxButton className="absolute inset-y-0 right-2 flex items-center text-gray-500">
            <FaCaretDown size={14} />
          </ComboboxButton>
        </div>

        {/* OPTIONS */}
        <ComboboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">

          {filtrarclientes.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No hay resultados
            </div>
          )}

          {filtrarclientes.map((cliente) => (
            <ComboboxOption
              key={cliente.id}
              value={cliente}
              className={({ active }) =>
                `flex items-center gap-2 px-3 py-2 cursor-pointer ${
                  active ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <FaCheck
                    size={14}
                    className={`${
                      selected ? "opacity-100" : "opacity-0"
                    } text-indigo-500`}
                  />
                  <span>{cliente.nombre}</span>
                </>
              )}
            </ComboboxOption>
          ))}

        </ComboboxOptions>
      </Combobox>

    </div>
  );
}