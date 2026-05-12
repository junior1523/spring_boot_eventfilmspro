import { useState } from "react";
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions
} from "@headlessui/react";

export default function BuscarContrato({ contratos = [], onSelect }) {
    const [query, setQuery] = useState("");
    const [contratoSelec, setContratoSelec] = useState(null);

    const filteredContratos =
        query === ""
            ? contratos
            : contratos.filter((c) =>
                c.nombre?.toLowerCase().includes(query.toLowerCase())
            );

    const handleSelect = (contrato) => {
        setContratoSelec(contrato);

        if (onSelect) {
            onSelect(contrato);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div>
                <label className="text-sm text-gray-600">Buscar contrato</label>

                <Combobox
                    value={contratoSelec}
                    onChange={handleSelect}  
                    onClose={() => setQuery("")}
                >
                    <div className="relative">
                        <ComboboxInput
                            className="
              w-full rounded-lg border-none bg-gray-100
              py-1.5 pl-3 pr-8 text-sm text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
                            displayValue={(c) => c?.nombre || ""}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar contrato..."
                        />

                        <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
                            ▼
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        className="
            mt-1 max-h-60 overflow-auto rounded-xl
            border border-gray-200 bg-white p-1 shadow-lg
            empty:invisible
          "
                    >
                        {filteredContratos.map((c) => (
                            <ComboboxOption
                                key={c.id}
                                value={c}
                                className="
                flex cursor-pointer items-center gap-2
                rounded-lg px-3 py-1.5 text-sm
                text-gray-900
                data-[focus]:bg-gray-100
                data-[selected]:bg-blue-50
              "
                            >
                                <span>{c.nombre}</span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>

           <div className="flex flex-col">
            <label className="font-outfit">Filtrar Por FEcha</label>
             <input
                type="date"

            />
           </div>
        </div>
    );
}