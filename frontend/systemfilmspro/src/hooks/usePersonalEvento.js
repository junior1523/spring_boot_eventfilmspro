import { useEffect, useState } from "react";

export const usePersonalEvento = (eventoId) => {
   const [personal, setPersonal] = useState([]);
   const [cargando, setCargando] = useState(false);

   useEffect(() => {
      if (!eventoId) return;

      setCargando(true);

      Promise.all([
         fetch("/asignaciones.json").then(r => r.json()),
         fetch("/personal.json").then(r => r.json()),
      ])
         .then(([dataAsignaciones, dataPersonal]) => {
            const asignaciones = dataAsignaciones.asignaciones ?? dataAsignaciones;
            const listaPersonal = dataPersonal.personal ?? dataPersonal;

           const asignadasAlEvento = asignaciones
               .filter(a => a.evento_id === eventoId)
               .map(a => {
                  const miembro = listaPersonal.find(p => p.id === a.personal_id);
                  return {
                     ...a,
                     nombre:        miembro?.nombre        ?? "Sin nombre",
                     rol:           miembro?.rol           ?? a.rol_en_evento ?? "—",
                     rol_en_evento: a.rol_en_evento        ?? miembro?.rol ?? "—",
                     telefono:      miembro?.telefono      ?? null,
                     foto_url:      miembro?.foto_url      ?? null,
                     rating:        miembro?.rating        ?? null,
                     disponibilidad: miembro?.disponibilidad ?? null,
                  };
               });

            setPersonal(asignadasAlEvento);
         })
         .catch(err => console.error("usePersonalEvento:", err))
         .finally(() => setCargando(false));
   }, [eventoId]);

   return { personal, cargando };
};