import Input from "../../../../componentes/ui/Input";

export default function PagosFormContratos({
  contratoEdicion,
  setContratoEdicion
}) {
  const pagos = contratoEdicion?.pagos || [];

  const handlePagoChange = (index, campo, valor) => {
    const newPagos = [...pagos];
    newPagos[index] = {
      ...newPagos[index],
      [campo]: valor
    };

    setContratoEdicion({
      ...contratoEdicion,
      pagos: newPagos
    });
  };

  const agregarCuota = () => {
    const newPagos = [
      ...pagos,
      {
        cuota: `Cuota ${pagos.length + 1}`,
        monto: "",
        fecha: ""
      }
    ];

    setContratoEdicion({
      ...contratoEdicion,
      pagos: newPagos
    });
  };

  return (
    <div className="flex flex-col gap-4">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Plan de Pagos</h3>

        <button
          type="button"
          onClick={agregarCuota}
          className="text-blue-600 text-sm hover:underline"
        >
          + Agregar Cuota
        </button>
      </div>


      {pagos.map((pago, index) => (
        <div
          key={index}
          className="border rounded-lg p-3 flex flex-col gap-2 bg-gray-50"
        >
          <h4 className="font-medium text-sm text-gray-700">
            Cuota #{index + 1}
          </h4>

          <Input
            value={pago.cuota}
            onChange={(e) =>
              handlePagoChange(index, "cuota", e.target.value)
            }
            placeholder="Cuota"
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={pago.monto}
              onChange={(e) =>
                handlePagoChange(index, "monto", e.target.value)
              }
              placeholder="Monto (S/)"
            />

            <Input
              type="date"
              value={pago.fecha}
              onChange={(e) =>
                handlePagoChange(index, "fecha", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}