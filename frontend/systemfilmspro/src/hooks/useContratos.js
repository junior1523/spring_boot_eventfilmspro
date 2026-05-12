import { useState, useEffect, useMemo } from "react";

export default function useContratos() {
    const [contratos, setContratos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState("todos");

    const [contratoEdicion, setContratoEdicion] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch("/contratos.json").then(r => r.json()),
            fetch("/eventos.json").then(r => r.json()),
            fetch("/clientes.json").then(r => r.json()),
        ]).then(([c, e, cl]) => {
            setContratos(c.contratos);
            setEventos(e.eventos);
            setClientes(cl.clientes);
        });
    }, []);

    const datosTabla = useMemo(() => {
    if (!contratos || !eventos || !clientes) return [];

    return contratos.map((c) => {
        const evento = eventos.find((e) => e.id === c.eventoId);
        const cliente = clientes.find((cl) => cl.id === c.clienteId);

        return {
            id: c.id,
            evento: evento?.nombre || "Sin nombre",
            tipo: evento?.tipo || "Sin tipo",
            fecha: c.fecha,
            monto: c.monto,
            estado: c.estado,
            clienteNombre: cliente?.nombre || "Sin cliente",
            cliente: cliente || null
        };
    });
}, [contratos, eventos, clientes]);

    const datosTablaFIltrado = useMemo(() => {
    if (!datosTabla) return [];

    return datosTabla.filter((d) =>
        d.evento.toLowerCase().includes(buscar.toLowerCase()) &&
        (d.estado === filtro || filtro === "todos")
    );
}, [filtro, buscar, datosTabla]);

const actualizarContrato = (actualizado) => {
    setContratos((prev) =>
        prev.map((c) =>
            c.id === actualizado.id ? actualizado : c
        )
    );

    setContratoEdicion(null);
};

    return {
        contratos,
        eventos,
        clientes,
        buscar,
        setBuscar,
        filtro,
        setFiltro,
        contratoEdicion,
        setContratoEdicion,
        datosTablaFIltrado,
        actualizarContrato
    };
}