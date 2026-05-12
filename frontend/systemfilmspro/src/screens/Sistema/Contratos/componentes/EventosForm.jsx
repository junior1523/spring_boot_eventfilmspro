import { Description, Field, Label, Select } from '@headlessui/react'
import Input from '../../../../componentes/ui/Input';


export default function EventosForm({ contratoEdicion, setContratoEdicion }) {
  const handleChange = (value) => {
    setContratoEdicion({
      ...contratoEdicion,
      evento: {
        ...contratoEdicion?.evento,
        tipo: value
      }
    });
  };

  const handleEvento = (campo, valor) => {
    setContratoEdicion({
      ...contratoEdicion,
      evento: {
        ...contratoEdicion?.evento,
        [campo]: valor
      }
    });
  };


  return (
    <div>
      <Field className="w-full">
        <Label className="text-sm font-medium text-gray-700">
          Tipo de evento
        </Label>

        <div className="relative mt-2">
          <Select
            value={contratoEdicion?.evento?.tipo || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecciona un evento
            </option>

            <option value="matrimonio">Matrimonio</option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="corporativo">Corporativo</option>
            <option value="boda">Boda</option>
          </Select>

          <p>z</p>
        </div>
      </Field>


      <div className='flex items-center justify-between'>
        <div>
          <label className="text-sm text-gray-600 block">Nombre del evento</label>
          <Input
            placeholder="Nombre del evento"
            value={contratoEdicion?.evento?.nombre || ""}
            onChange={(e) => handleEvento("nombre", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Dirección</label>
          <Input
            placeholder="Dirección"
            value={contratoEdicion?.evento?.direccion || ""}
            onChange={(e) => handleEvento("direccion", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        <div>
          <label className="text-sm text-gray-600">Fecha inicio</label>
          <Input

            type="date"
            value={contratoEdicion?.evento?.fechaInicio || ""}
            onChange={(e) => handleEvento("fechaInicio", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Fecha fin</label>
          <Input

            type="date"
            value={contratoEdicion?.evento?.fechaFin || ""}
            onChange={(e) => handleEvento("fechaFin", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Días</label>
          <Input

            type="number"
            placeholder="Días"
            value={contratoEdicion?.evento?.dias || ""}
            onChange={(e) => handleEvento("dias", e.target.value)}
          />
        </div>
      </div>
    </div>

  )
}