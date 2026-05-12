import { TbHome, TbShape, TbKey } from "react-icons/tb";
import { LuFileSpreadsheet, LuCalendarDays } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMovie } from "react-icons/md";
import { GoBriefcase } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import BotonTema from "./BotonTema"

const menus = [
   { item: "Dashboard", icon: <TbHome size={23} />, url: "/dashboard" },
   { item: "Contratos", icon: <LuFileSpreadsheet size={23} />, url: "/dashboard/contratos" },
   { item: "Pagos", icon: <RiMoneyDollarCircleLine size={23} />, url: "/dashboard/pagos" },
   { item: "Personal", icon: <FaRegUser size={23} />, url: "/dashboard/empleados" },
   { item: "Ediciones", icon: <MdOutlineMovie size={23} />, url: "/dashboard/ediciones" },
   { item: "Horarios", icon: <LuCalendarDays size={23} />, url: "/dashboard/calendario" },
   { item: "Material", icon: <GoBriefcase size={23} />, url: "/" },
]

export default function Sidebar() {
   const [abierto, setAbierto] = useState(false);
   const navegar = useNavigate();
   const locacion = useLocation();


   return (
      <div className={`
      ${abierto ? "w-[170px]" : "w-[40px]"}
   h-screen bg-white flex justify-center transition-all transform ease-in-out duration-500 overflow-hidden`}>
         <div className={`
         ${abierto ? "left-42 " : "left-10"}
            absolute top-4 z-10 bg-white h-[45px] w-[45px] rounded-r-md flex items-center justify-center transition-all transform ease-in-out duration-500`}>
             <IoMenu onClick={() => setAbierto(!abierto)} size={29} />
         </div>
       
         <div className="w-[80%] h-full bg-white mt-3">
            <div className={`
              ${abierto ? "block" : "hidden"}
               px-3.5 flex items-center justify-between
               `}>
               <TbKey />
               <h2>Event FilmsPro</h2>
            </div>
            <div className="w-full h-[1px] mb-5 bg-gray-400"></div>

            {menus.map((menu, i) => {
               const activo = locacion.pathname === menu.url;

               return (
                  <div
                     key={i}
                     onClick={() => navegar(menu.url)}
                     className={`
                        font-outfit text-[16px]
                ${activo ? "bg-[#0F1EEB]/20 text-indigo-700" : ""}
                w-full rounded-md hover:text-white hover:bg-indigo-400 p-1 flex items-center gap-2 text-[15px] mt-1`}>
                     <div className="">
                        {menu.icon}
                     </div>
                     {menu.item}

                  </div>
               )
            })}

            <BotonTema />
         </div>
      </div>
   )
}