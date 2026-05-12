import { useState, useEffect, useMemo } from "react";

const API_BASE_URL = "http://localhost:8080/api";

export default function useContratos() {
    const [contratos, setContratos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState("todos");

    const [contratoEdicion, setContratoEdicion] = useState(null);

    const cargarDatos = () => {
        Promise.all([
            fetch(`${API_BASE_URL}/contratos`).then(r => r.json()),
            fetch("/eventos.json").then(r => r.json()),
            fetch("/clientes.json").then(r => r.json()),
        ]).then(([c, e, cl]) => {
            setContratos(Array.isArray(c) ? c : c.contratos || []);
            setEventos(e.eventos || []);
            setClientes(cl.clientes || []);
        }).catch(err => {
            console.error("Error al conectar con la API de Spring Boot:", err);
            // Fallback para no romper la UI si el servidor no está corriendo
            setContratos([]);
        });
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const datosTabla = useMemo(() => {
        if (!contratos) return [];

        return contratos.map((c) => {
            const evento = eventos.find((e) => e.id === (c.eventoId || c.tipoEventoId));
            
            return {
                id: c.id,
                evento: c.nombreEvento || evento?.nombre || "Sin nombre",
                tipo: c.tipoEventoOtro || evento?.tipo || "Sin tipo",
                fecha: c.fechaInicio || c.fecha || c.fecha_creacion,
                monto: c.monto || "N/A",
                estado: c.estado,
                clienteNombre: c.apellidosNombres || "Sin cliente",
                original: c
            };
        });
    }, [contratos, eventos]);

    const datosTablaFIltrado = useMemo(() => {
        if (!datosTabla) return [];

        return datosTabla.filter((d) =>
            d.evento.toLowerCase().includes(buscar.toLowerCase()) &&
            (d.estado === filtro || filtro === "todos")
        );
    }, [filtro, buscar, datosTabla]);

    const crearContrato = async (nuevo) => {
        try {
            const res = await fetch(`${API_BASE_URL}/contratos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo)
            });
            if (res.ok) {
                cargarDatos();
                return true;
            }
        } catch (error) {
            console.error("Error al crear contrato:", error);
        }
        return false;
    };

    const actualizarContrato = async (actualizado) => {
        try {
            const res = await fetch(`${API_BASE_URL}/contratos/${actualizado.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actualizado)
            });
            if (res.ok) {
                cargarDatos();
                setContratoEdicion(null);
                return true;
            }
        } catch (error) {
            console.error("Error al actualizar contrato:", error);
        }
        return false;
    };

    const eliminarContrato = async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/contratos/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                cargarDatos();
                return true;
            }
        } catch (error) {
            console.error("Error al eliminar contrato:", error);
        }
        return false;
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
        crearContrato,
        actualizarContrato,
        eliminarContrato,
        recargar: cargarDatos
    };
}