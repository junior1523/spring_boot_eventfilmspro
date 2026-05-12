import { useState, useRef } from "react";
import { COLORES_POR_TIPO } from "../../../../utilidades/constantes/datosConstantes";

const ICONOS_TIPO = {
   Matrimonio:  "💍",
   "XV Años":   "🌸",
   Cumpleaños:  "🎂",
   Corporativo: "🏢",
   Boda:        "💒",
};

export default function TooltipEvento({ evento, children }) {
   const [visible, setVisible] = useState(false);
   const timerRef = useRef(null);

   const colores = COLORES_POR_TIPO[evento.tipo] || COLORES_POR_TIPO.default;
   const icono   = ICONOS_TIPO[evento.tipo] ?? "📅";

   const mostrar = () => {
      timerRef.current = setTimeout(() => setVisible(true), 300);
   };
   const ocultar = () => {
      clearTimeout(timerRef.current);
      setVisible(false);
   };

   return (
      <div
         className="relative w-full h-full"
         onMouseEnter={mostrar}
         onMouseLeave={ocultar}
      >
         {children}

         {visible && (
            <div
               className="absolute z-50 pointer-events-none"
               style={{
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  minWidth: 180,
                  maxWidth: 240,
               }}
            >
              <div
                  style={{
                     position: "absolute",
                     bottom: -5,
                     left: "50%",
                     transform: "translateX(-50%)",
                     width: 10,
                     height: 10,
                     backgroundColor: "#1e293b",
                     clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
               />

               <div
                  style={{
                     backgroundColor: "#1e293b",
                     borderRadius: 10,
                     padding: "10px 12px",
                     boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                     animation: "fadeInTooltip 0.15s ease",
                  }}
               >
              <div className="flex items-center gap-1.5 mb-2">
                     <span style={{ fontSize: 12 }}>{icono}</span>
                     <span
                        style={{
                           fontSize: 9,
                           fontWeight: 700,
                           letterSpacing: "0.08em",
                           textTransform: "uppercase",
                           color: colores.border,
                        }}
                     >
                        {evento.tipo}
                     </span>
                  </div>

                  <p style={{ color: "#f1f5f9", fontSize: 12, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>
                     {evento.nombre}
                  </p>

                  <div className="flex items-center gap-1" style={{ color: "#94a3b8", fontSize: 10 }}>
                     <span>🕐</span>
                     <span>{evento.horaInicio} – {evento.horaFin}</span>
                  </div>

                  {evento.lugar && (
                     <div className="flex items-center gap-1 mt-1" style={{ color: "#94a3b8", fontSize: 10 }}>
                        <span>📍</span>
                        <span className="truncate">{evento.lugar}</span>
                     </div>
                  )}

                  {evento.estado && (
                     <div className="mt-2">
                        <span
                           style={{
                              fontSize: 9,
                              fontWeight: 600,
                              padding: "2px 7px",
                              borderRadius: 99,
                              backgroundColor: colores.bg + "33",
                              color: colores.border,
                              border: `1px solid ${colores.bg}55`,
                           }}
                        >
                           {evento.estado}
                        </span>
                     </div>
                  )}

                  <p style={{ color: "#475569", fontSize: 9, marginTop: 6 }}>
                     Click para ver detalle →
                  </p>
               </div>

               <style>{`
                  @keyframes fadeInTooltip {
                     from { opacity: 0; transform: translateX(-50%) translateY(4px); }
                     to   { opacity: 1; transform: translateX(-50%) translateY(0); }
                  }
               `}</style>
            </div>
         )}
      </div>
   );
}