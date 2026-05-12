export default function Card({ imagen, rol, nombre, rating, disponibilidad }) {
    return (
        <div
            style={{ backgroundImage: `url(${imagen})` }}
            className="relative w-[180px] h-[270px] rounded-2xl overflow-hidden bg-cover bg-center shadow-lg">

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-between p-3">

                <span className="flex items-center gap-1 bg-white/20 backdrop-blur-lg text-white text-xs font-semibold px-2 py-1 rounded-full w-fit">
                    🎥 {rol}
                </span>

                <div className="flex flex-col gap-2">

                    <div className="flex justify-between items-end">
                        <h3 className="text-white font-bold text-sm leading-tight">{nombre}</h3>
                        <p className="text-yellow-400 font-bold text-sm flex items-center gap-0.5">
                            ⭐ {rating}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-lg
                            ${disponibilidad === "Disponible"
                                ? "bg-green-400/40 text-white"
                                : "bg-red-500/40 text-white"}`}>
                            {disponibilidad}
                        </span>

                        <div className="flex gap-2 text-white/80">
                            <button className="hover:text-white transition">👁</button>
                            <button className="hover:text-white transition">✏️</button>
                            <button className="hover:text-red-400 transition">🗑</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}