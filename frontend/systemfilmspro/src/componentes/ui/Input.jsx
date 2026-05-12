import { CiSearch } from "react-icons/ci";

export default function Input({classname = "", placeholder, value, onChange, icono,}) {
    return (
       <div className={`${classname} p-3 rounded-md flex justify-between bg-gray-200  items-center hover:bg-amber-200s`}>
         <input
         onChange={onChange}
         value={value}
         placeholder={placeholder}
         className="font-outfit outline-none "
        />
         {icono}
       </div>

    )
}