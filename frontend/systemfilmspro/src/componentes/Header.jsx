import Boton from "./ui/Boton"
import { IoAddSharp } from "react-icons/io5";

export default function Header({
  titulo = "Título",
  descripcion = "",
  textoBoton = "Nuevo",
  onNuevo,
  icono
}) {
  return (
    <header className="
      sticky top-0 z-20
      flex justify-between items-center
      py-4 px-2
       backdrop-blur-md
      border-b border-gray-200
    ">

      <div>
        <h2 className="text-[28px] font-out font-semibold">
          {titulo}
        </h2>
        {descripcion && (
          <p className="text-gray-500">
            {descripcion}
          </p>
        )}
      </div>

      <Boton
        onClick={onNuevo}
        icono={icono || <IoAddSharp size={23}/>}
        texto={textoBoton}
        color="primario"
      />

    </header>
  );
}