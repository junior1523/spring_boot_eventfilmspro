export default function CardEdicion({ evento }) {

  const estadoColor = {
    pendiente: "bg-orange-400",
    enedicion: "bg-yellow-500",
    confirmado: "bg-green-500",
    filmado: "bg-indigo-500"
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md group">

      <img
        src="https://picsum.photos/400/250"
        alt=""
        className="w-full h-[180px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end text-white">

        <h4 className="font-semibold text-sm">
          {evento.nombre}
        </h4>

        <p className="text-xs opacity-80">
          {evento.tipo || "Evento"}
        </p>

        <div className="flex justify-between items-center mt-2">

          <span className={`
            text-xs px-2 py-1 rounded-md
            ${estadoColor[evento.estado?.toLowerCase()] || "bg-gray-500"}
          `}>
            {evento.estado}
          </span>

          <button className="text-xs bg-white/20 px-2 py-1 rounded-md hover:bg-white/30">
            Ver más
          </button>

        </div>
      </div>
    </div>
  );
}