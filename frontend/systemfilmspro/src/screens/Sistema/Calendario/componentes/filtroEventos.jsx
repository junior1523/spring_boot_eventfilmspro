
import { GiCheckMark } from "react-icons/gi";

export default function FiltroEventos({ tiposEventos, filtros, setFiltros }) {

    const toggleFiltro = (tipo) => {
        if (filtros.includes(tipo)) {
            setFiltros(filtros.filter(f => f !== tipo));
        } else {
            setFiltros([...filtros, tipo]);
        }
    };

    return (
        <div className="p-2 py-5">
            <h2 className="font-outfit text-[17px]">Mi Calendario:</h2>

            <div>
                {tiposEventos.map((e) => (
                    <label
                        className="flex gap-2 py-1"
                        key={e.id}
                    >
                        <input
                            checked={filtros.includes(e.nombre)}
                            onChange={() => toggleFiltro(e.nombre)}
                            className="peer hidden"
                            type="checkbox"
                        />

                        <div className="w-7 h-7 border border-gray-400 rounded flex items-center justify-center peer-checked:bg-indigo-500 transition-all transform ease-in-out duration-800">
                            <GiCheckMark className="text-white" />
                        </div>
                        <p className="font-outfit">{e.nombre}</p>

                    </label>
                ))}
            </div>
        </div>
    )
}