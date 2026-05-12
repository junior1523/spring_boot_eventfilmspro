import { FaArrowDown } from "react-icons/fa";

const colores = {
    primario: "bg-indigo-600 text-white hover:bg-indigo-500",
    peligro: "bg-red-400",
    blanco: "bg-white"
}

export default function Boton({texto, color = "", onClick, className = "", icono}) {
    return (
      <div
      onClick={onClick}
      className={`${colores[color]} w-auto h-[30px] flex items-center  rounded-md ${className} p-5 `  }
      >
        <div className="flex w-full justify-between items-center gap-2 ">
            {icono}
            <h3 className="font-outfit text-[18px]">{texto}</h3>
        </div>
      </div>
    )
}