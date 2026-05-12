import Input from "../../../../componentes/ui/Input";

export default function RangoFilmacionForm({contratoEdicion, setContratoEdicion})  {
    return (
         <div>
                        <h3 className="font-semibold mb-2">Rango de Filmación</h3>
        
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label className="text-sm text-gray-600">Día</label>
                                <Input
                                    value={contratoEdicion?.filmacion?.dia || ""}
                                    onChange={(e) =>
                                        setContratoEdicion({
                                            ...contratoEdicion,
                                            filmacion: {
                                                ...contratoEdicion?.filmacion,
                                                dia: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>
        
                            <div>
                                <label className="text-sm text-gray-600">Hora inicio</label>
                                <Input
                                    type="time"
                                    value={contratoEdicion?.filmacion?.horaInicio || ""}
                                    onChange={(e) =>
                                        setContratoEdicion({
                                            ...contratoEdicion,
                                            filmacion: {
                                                ...contratoEdicion?.filmacion,
                                                horaInicio: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>
        
                            <div>
                                <label className="text-sm text-gray-600">Hora fin</label>
                                <Input
                                    type="time"
                                    value={contratoEdicion?.filmacion?.horaFin || ""}
                                    onChange={(e) =>
                                        setContratoEdicion({
                                            ...contratoEdicion,
                                            filmacion: {
                                                ...contratoEdicion?.filmacion,
                                                horaFin: e.target.value
                                            }
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
    )
}