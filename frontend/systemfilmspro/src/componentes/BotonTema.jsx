import { useTema }from "../utilidades/useTema"
import { MdLightMode, MdDarkMode, MdBrightness6 } from "react-icons/md";

const ciclo = { light: "dark", dark: "sistema", sistema: "light" };

const estados = {
  light:   { icon: <MdLightMode size={20} />,   label: "Claro" },
  dark:    { icon: <MdDarkMode size={20} />,    label: "Oscuro" },
  sistema: { icon: <MdBrightness6 size={20} />, label: "Sistema" },
};

export default function BotonTema() {
  const { tema, setTema } = useTema();
  const actual = estados[tema];

  return (
    <button
      onClick={() => setTema(ciclo[tema])}
      className="flex items-center gap-2 px-3 py-2 rounded-md
                 bg-gray-100 dark:bg-gray-800
                 text-gray-600 dark:text-gray-300
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-colors text-sm">
      {actual.icon}
      {actual.label}
    </button>
  );
}