export default function CardEstadistico ({ icono, titulo, monto, balance, className = ""}) {
 
    const bajo = Number(balance) > 0;

    return (
        <div className={`
          ${className} 
          w-[220px] 
          rounded-xl 
          p-4 
          mt-6 
          transition-all duration-200
        `}>
           
           <div className="flex gap-3 items-center">
             <div className=" ">
               {icono}
             </div>

             <h3 className="text-[19px] md:text-[19px] font-outfit ">
               {titulo}
             </h3>
           </div>

           <div className="w-full flex justify-between items-center mt-3">
              
              <h2 className="text-[28px] font-bold ">
                {monto}
              </h2>

              {balance && (
                <p className={`
                  ${bajo ? "bg-red-500" : "bg-green-500"}
                  px-2 py-1 
                  rounded-md 
                  text-xs 
                  text-white 
                  font-medium
                `}>
                  {balance}
                </p>
              )}
           </div>
        </div>
    )
}