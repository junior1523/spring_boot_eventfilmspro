import Drawer from "../../../../componentes/drawer";
import ContratoForm from "./ContratoForm";

export default function NuevoContrato({
  abierto,
  cerrar,
  clientes
}) {
  return (
    <Drawer abierto={abierto} cerrar={cerrar} titulo="Nuevo Contrato">
      <ContratoForm
        clientes={clientes}
        onSubmit={(data) => {
          console.log("crear", data);
          cerrar();
        }}
      />
    </Drawer>
  );
}