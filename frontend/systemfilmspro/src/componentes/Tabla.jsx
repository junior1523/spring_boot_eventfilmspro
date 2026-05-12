export default function Tabla({ datos, columnas }) {

  const ESTADOS = {
    pendiente: "bg-orange-400",
    confirmado: "bg-green-500",
    activo: "bg-green-500",
    filmado: "bg-indigo-500",
    pagado: "bg-green-500",
    deuda: "bg-red-500",
    cancelado: "bg-red-600",
    enedicion: "bg-red-500"
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full">

        <thead>
          <tr className="bg-gray-200">
            {columnas.map((col) => (
              <th
                key={col.id}
                className="px-4 py-3 text-gray-600 font-semibold text-sm tracking-wide border-r border-gray-300 last:border-r-0"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {datos.map((dato, i) => (
            <tr
              key={i}
              className={`hover:bg-indigo-50/50 transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >

              {columnas.map((col) => {

                if (col.render) {
                  return (
                    <td
                      key={col.id}
                      className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-900 last:border-r-0"
                    >
                      {col.render(dato)}
                    </td>
                  );
                }

                if (col.id === "estado") {
                  const estadoNormalizado = dato.estado?.toLowerCase();

                  return (
                    <td
                      key={col.id}
                      className="px-4 py-3 text-center border-r border-gray-200 last:border-r-0"
                    >
                      <span
                        className={`
                          inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium text-white
                          ${ESTADOS[estadoNormalizado] || "bg-orange-400"}
                        `}
                      >
                        {dato.estado}
                      </span>
                    </td>
                  );
                }

                return (
                  <td
                    key={col.id}
                    className="px-4 py-3 text-[14px] font-outfit text-sm text-black font-semibold text-center border-r border-gray-300 last:border-r-0"
                  >
                    {dato[col.id]}
                  </td>
                );
              })}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}