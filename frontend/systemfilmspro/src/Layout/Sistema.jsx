import { Outlet } from "react-router";
import Sidebar from "../componentes/Sidebar";

export default function LayoutSistema() {
   return(
     <div className="flex h-screen w-full bg-gray-100"> 
      <Sidebar />


         <div className="flex flex-1 overflow-y-auto">
           <Outlet />
         </div>
     </div>
   )
}