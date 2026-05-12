import { useEffect, useState } from "react";

export const useHorarios = () => {
   const [horarios, setHorarios] = useState([]);

   useEffect(() => {
      Promise.all([
         fetch("/horarios.json").then(r => r.json()),
         fetch("/eventos.json").then(r => r.json()),
      ])
         .then(([dataHorarios, dataEventos]) => {
            const eventos = dataEventos.eventos ?? dataEventos;

            const enriquecidos = (dataHorarios.horarios ?? dataHorarios).map(h => {
               const evento = eventos.find(e => e.id === h.evento_id);
               return {
                  ...h,
                  horaInicio: h.hora_inicio,
                  horaFin:    h.hora_fin,
                  nombre: evento?.nombre ?? `Evento #${h.evento_id}`,
                  tipo:   evento?.tipo   ?? "Corporativo",
               };
            });

            setHorarios(enriquecidos);
         })
         .catch(err => console.error("useHorarios:", err));
   }, []);

   return { horarios };
};