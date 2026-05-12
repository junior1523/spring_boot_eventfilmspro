import { useEffect } from "react";
import { usePersonalEvento } from "../../../../hooks/usePersonalEvento";
import { COLORES_POR_TIPO } from "../../../../utilidades/constantes/datosConstantes";

const ICONOS_TIPO = {
   Matrimonio:  "💍",
   "XV Años":   "🌸",
   Cumpleaños:  "🎂",
   Corporativo: "🏢",
   Boda:        "💒",
};

const ICONOS_ROL = {
   Camarografo: "🎥",
   Fotografo:   "📷",
   Editor:      "🎬",
   Drone:       "🚁",
   Sonido:      "🎙️",
};

const COLORES_ESTADO = {
   Confirmado:   { bg: "#dcfce7", text: "#166534" },
   Pendiente:    { bg: "#fef9c3", text: "#854d0e" },
   "En edicion": { bg: "#dbeafe", text: "#1e40af" },
   Filmado:      { bg: "#f3e8ff", text: "#6b21a8" },
   Completado:   { bg: "#f1f5f9", text: "#475569" },
};

function Estrellas({ rating }) {
   if (!rating) return null;
   return (
      <div className="flex gap-0.5">
         {[1, 2, 3, 4, 5].map(n => (
            <span key={n} style={{ fontSize: 10, color: n <= Math.round(rating) ? "#f59e0b" : "#e2e8f0" }}>
               ★
            </span>
         ))}
         <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: 3 }}>{rating}</span>
      </div>
   );
}

function AvatarPersonal({ nombre, fotoUrl }) {
   const iniciales = nombre.split(" ").slice(0, 2).map(p => p[0]).join("").toUpperCase();
   if (fotoUrl) {
      return <img src={fotoUrl} alt={nombre} className="w-9 h-9 rounded-full object-cover" />;
   }
   return (
      <div
         className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0"
         style={{ backgroundColor: "#e0e7ff", color: "#4338ca", fontSize: 12 }}
      >
         {iniciales}
      </div>
   );
}

export default function ModalEvento({ evento, onCerrar }) {
   const { personal, cargando } = usePersonalEvento(evento?.evento_id);

   useEffect(() => {
      const handler = (e) => { if (e.key === "Escape") onCerrar(); };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
   }, [onCerrar]);

   if (!evento) return null;

   const colores     = COLORES_POR_TIPO[evento.tipo] || COLORES_POR_TIPO.default;
   const icono       = ICONOS_TIPO[evento.tipo] ?? "📅";
   const estadoColor = COLORES_ESTADO[evento.estado] ?? { bg: "#f1f5f9", text: "#475569" };

   return (
      <>
         <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(2px)" }}
            onClick={onCerrar}
         />

         <div
            className="fixed z-50 flex flex-col"
            style={{
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: "min(480px, 92vw)",
               maxHeight: "85vh",
               backgroundColor: "#fff",
               borderRadius: 16,
               boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
               overflow: "hidden",
               animation: "modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            }}
         >

            <div
               style={{
                  background: `linear-gradient(135deg, ${colores.bg}, ${colores.bg}cc)`,
                  padding: "20px 20px 16px",
                  position: "relative",
               }}
            >

               <button
                  onClick={onCerrar}
                  className="absolute top-3 right-3 flex items-center justify-center rounded-full transition-colors"
                  style={{
                     width: 28, height: 28,
                     backgroundColor: "rgba(255,255,255,0.6)",
                     color: "#475569",
                     fontSize: 14,
                     border: "none",
                     cursor: "pointer",
                  }}
               >
                  ✕
               </button>

               <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: 22 }}>{icono}</span>
                  <span
                     style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: colores.bg === "#fff" ? colores.border : "#fff",
                        backgroundColor: colores.bg === "#fff" ? colores.border + "22" : "rgba(255,255,255,0.25)",
                        padding: "2px 9px",
                        borderRadius: 99,
                     }}
                  >
                     {evento.tipo}
                  </span>
                  <span
                     style={{
                        marginLeft: "auto",
                        marginRight: 32,
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 99,
                        backgroundColor: estadoColor.bg,
                        color: estadoColor.text,
                     }}
                  >
                     {evento.estado}
                  </span>
               </div>

               <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>
                  {evento.nombre}
               </h2>

               <div className="flex items-center gap-4 mt-2">
                  <span style={{ fontSize: 12, color: "#475569" }}>
                     📅 {evento.fecha}
                  </span>
                  <span style={{ fontSize: 12, color: "#475569" }}>
                     🕐 {evento.horaInicio} – {evento.horaFin}
                  </span>
               </div>

               {evento.lugar && (
                  <div className="mt-1" style={{ fontSize: 12, color: "#64748b" }}>
                     📍 {evento.lugar}
                  </div>
               )}
            </div>

            <div className="overflow-y-auto flex-1" style={{ padding: "16px 20px 20px" }}>

               <div
                  className="grid grid-cols-2 gap-3 mb-4"
                  style={{ padding: "12px", backgroundColor: "#f8fafc", borderRadius: 10 }}
               >
                  <div>
                     <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        ID Horario
                     </p>
                     <p style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>#{evento.id}</p>
                  </div>
                  <div>
                     <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        ID Evento
                     </p>
                     <p style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>#{evento.evento_id}</p>
                  </div>
               </div>

               <div>
                  <h3
                     className="flex items-center gap-2"
                     style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                     <span style={{ color: colores.bg === "#fff" ? colores.border : colores.bg }}>●</span>
                     Personal asignado
                  </h3>

                  {cargando ? (
                     <div className="flex flex-col gap-2">
                        {[1, 2].map(i => (
                           <div
                              key={i}
                              style={{ height: 52, backgroundColor: "#f1f5f9", borderRadius: 10, animation: "pulse 1.5s infinite" }}
                           />
                        ))}
                     </div>
                  ) : personal.length === 0 ? (
                     <div
                        style={{
                           padding: "16px",
                           textAlign: "center",
                           backgroundColor: "#f8fafc",
                           borderRadius: 10,
                           color: "#94a3b8",
                           fontSize: 13,
                        }}
                     >
                        Sin personal asignado
                     </div>
                  ) : (
                     <div className="flex flex-col gap-2">
                        {personal.map((p, i) => (
                           <div
                              key={i}
                              className="flex items-center gap-3"
                              style={{
                                 padding: "10px 12px",
                                 backgroundColor: "#f8fafc",
                                 borderRadius: 10,
                                 border: "1px solid #e2e8f0",
                              }}
                           >
                              <AvatarPersonal nombre={p.nombre} fotoUrl={p.foto_url} />

                              <div className="flex-1 min-w-0">
                                 <div className="flex items-center gap-2">
                                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                                       {p.nombre}
                                    </p>
                                    <span style={{ fontSize: 10, color: "#64748b" }}>
                                       {ICONOS_ROL[p.rol] ?? "👤"}
                                    </span>
                                 </div>
                                 <p style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>
                                    {p.rol_en_evento}
                                 </p>
                                 <Estrellas rating={p.rating} />
                              </div>

                              {p.telefono && (
                                 <a
                                    href={`tel:${p.telefono}`}
                                    style={{
                                       fontSize: 10,
                                       color: colores.bg === "#fff" ? colores.border : colores.bg,
                                       textDecoration: "none",
                                       fontWeight: 600,
                                       flexShrink: 0,
                                    }}
                                 >
                                    📞 {p.telefono}
                                 </a>
                              )}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            <div
               style={{
                  padding: "12px 20px",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "flex-end",
               }}
            >
               <button
                  onClick={onCerrar}
                  style={{
                     padding: "8px 20px",
                     borderRadius: 8,
                     border: "1px solid #e2e8f0",
                     backgroundColor: "#fff",
                     color: "#475569",
                     fontSize: 13,
                     fontWeight: 500,
                     cursor: "pointer",
                  }}
               >
                  Cerrar
               </button>
            </div>
         </div>

         <style>{`
            @keyframes modalIn {
               from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
               to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes pulse {
               0%, 100% { opacity: 1; }
               50% { opacity: 0.5; }
            }
         `}</style>
      </>
   );
}