import { useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import Input from "../../../../componentes/ui/Input";


export default function ClientesForm({ contratoEdicion, setContratoEdicion, clientes }) {
    const [query, setQuery] = useState("");

    const handleCliente = (campo, valor) => {
        setContratoEdicion({
            ...contratoEdicion,
            cliente: {
                ...contratoEdicion?.cliente,
                [campo]: valor
            }
        });
    };

    const filteredClientes =
        query === ""
            ? clientes
            : clientes.filter((c) =>
                c.nombre.toLowerCase().includes(query.toLowerCase())
            );


    return (

        <div>
            <h3 className="font-semibold mb-2">Campos del Cliente</h3>

            <label className="text-sm text-gray-600">Apellidos y Nombres</label>
            <Combobox
                value={contratoEdicion?.cliente || { nombre: "" }}
                onChange={(cliente) => {
                    setContratoEdicion({
                        ...contratoEdicion,
                        cliente: cliente
                    });
                }}
                onClose={() => setQuery("")}
            >
                <div className="relative">
                    <ComboboxInput
                        className="
                w-full rounded-lg border-none bg-gray-100
                py-1.5 pl-3 pr-8 text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
                        displayValue={(cliente) => cliente?.nombre || query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleCliente("nombre", e.target.value);
                        }}
                        placeholder="Buscar cliente..."
                    />

                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <svg
                            className="h-4 w-4 text-gray-500 group-hover:text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    className="
              mt-1 max-h-60 overflow-auto rounded-xl
              border border-gray-200 bg-white p-1 shadow-lg
              empty:invisible
            "
                >
                    {filteredClientes.map((cliente) => (
                        <ComboboxOption
                            key={cliente.id}
                            value={cliente}
                            className="
                  flex cursor-pointer items-center gap-2
                  rounded-lg px-3 py-1.5 text-sm
                  text-gray-900
                  data-[focus]:bg-gray-100
                  data-[selected]:bg-blue-50
                "
                        >
                            <svg
                                className="invisible h-4 w-4 text-blue-600 data-[selected]:visible"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.85a1 1 0 011.414-1.414l3.515 3.515 6.364-6.364a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <span>{cliente.nombre}</span>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>

            <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                    <label className="text-sm text-gray-600">DNI</label>
                    <Input
                        placeholder="DNI"
                        value={contratoEdicion?.cliente?.dni || ""}
                        onChange={(e) => handleCliente("dni", e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Teléfono</label>
                    <Input
                        placeholder="Teléfono"
                        value={contratoEdicion?.cliente?.telefono || ""}
                        onChange={(e) => handleCliente("telefono", e.target.value)}
                    />
                </div>
            </div>
        </div>

    )
}