import { formatearFechaISO } from "../utilidades/formatearFecha";


export function useSemana(fechaSeleccionada) {
   const obtenerInicioSemana = (fecha) => {
      const f = new Date(fecha);
      const dia = f.getDay();
      const diff = f.getDate() - (dia === 0 ? 6 : dia - 1);
      return new Date(f.setDate(diff));
   };

   const inicioSemana = obtenerInicioSemana(fechaSeleccionada);

   const diasSemana = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(inicioSemana);
      d.setDate(d.getDate() + i);
      return d;
   });

   const esHoy = (dia) => {
      const hoy = new Date();
      return formatearFechaISO(dia) === formatearFechaISO(hoy);
   };

   const esSeleccionado = (dia) =>
      formatearFechaISO(dia) === formatearFechaISO(fechaSeleccionada);

   return { diasSemana, esHoy, esSeleccionado };
}