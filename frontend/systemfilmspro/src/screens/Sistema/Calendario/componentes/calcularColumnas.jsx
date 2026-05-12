
export function calcularColumnas(horarios) {
   if (!horarios.length) return [];

   const aMin = (hora) => {
      const [h, m] = hora.split(":").map(Number);
      return h * 60 + m;
   };

  const ordenados = [...horarios].map((e) => ({
      ...e,
      _inicio: aMin(e.horaInicio),
      _fin: aMin(e.horaFin),
      columna: 0,
      totalColumnas: 1,
   })).sort((a, b) => a._inicio - b._inicio);

  const grupos = []; 

   for (const evento of ordenados) {
      let colocado = false;

      for (const grupo of grupos) {
        const hayConflicto = grupo.some(
            (g) => evento._inicio < g._fin && evento._fin > g._inicio
         );

         if (hayConflicto) {
           const columnasUsadas = new Set(grupo.map((g) => g.columna));
            let col = 0;
            while (columnasUsadas.has(col)) col++;
            evento.columna = col;
            grupo.push(evento);
            colocado = true;
            break;
         }
      }

      if (!colocado) {
         evento.columna = 0;
         grupos.push([evento]);
      }
   }

   for (const grupo of grupos) {
      const maxCol = Math.max(...grupo.map((e) => e.columna));
      for (const e of grupo) {
         e.totalColumnas = maxCol + 1;
      }
   }

   return ordenados;
}