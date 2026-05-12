export default function PanelAlmacenados() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-full">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">EVENTOS ALMACENADOS</h3>
        <button className="bg-black text-white px-3 py-1 rounded">
          + Designar
        </button>
      </div>

      <div className="text-gray-400 text-sm">
        No hay eventos asignados
      </div>
    </div>
  );
}