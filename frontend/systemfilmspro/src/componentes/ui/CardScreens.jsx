export default function CardScreens ({className = "", icono, texto, monto, colorIcon}) {
    return (
      <div
      className={`
        ${className}
        w-auto p-2 border border-gray-200 rounded-md`}
      >
        <div className="flex justify-between items-center gap-9">
          <div className="flex justify-between items-center gap-2">
            <div className={`${colorIcon} rounded-full p-2`}>
                {icono}
            </div>
            <h2 className="text-gray-600 font-outfit" >{texto}</h2>
          </div>

          <div>
            <p className="text-[26px] text-black font-outfit font-semibold">{monto}</p>
          </div>
        </div>
      </div>
    )
}