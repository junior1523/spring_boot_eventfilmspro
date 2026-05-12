//calendario
export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];



//agendas

export const PIXELES_POR_MINUTO = 1;


export const HORA_INICIO_H = 0;
export const HORA_FIN_H = 24;
export const HORA_INICIO = HORA_INICIO_H * 60;

export const HORAS = Array.from(
   { length: HORA_FIN_H - HORA_INICIO_H + 1 },
   (_, i) => {
      const h = HORA_INICIO_H + i;
      return `${String(h).padStart(2, "0")}:00`;
   }
);

export const ALTURA_HEADER_DIA = 44; 

export const COLORES_POR_TIPO = {
   Matrimonio: { bg: "#f43f5e", light: "#fff1f2", border: "#fb7185" },
   "XV Años":  { bg: "#a855f7", light: "#faf5ff", border: "#c084fc" },
   Corporativo:{ bg: "#3b82f6", light: "#eff6ff", border: "#60a5fa" },
   Cumpleaños: { bg: "#22c55e", light: "#f0fdf4", border: "#4ade80" },
   default:    { bg: "#64748b", light: "#f8fafc", border: "#94a3b8" },
};