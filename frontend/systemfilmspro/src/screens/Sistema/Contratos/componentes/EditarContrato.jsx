import Drawer from "../../../../componentes/DrawerEdicionDatos";
import ContratoForm from "./ContratoForm";

export default function EditarContratoWrapper({
  contratoEdicion,
  setContratoEdicion,
  actualizar,
  clientes
}) {
  return (
    <Drawer
      open={!!contratoEdicion}
      onClose={() => setContratoEdicion(null)}
      title="Editar contrato"
    >
      <ContratoForm
        initialData={contratoEdicion}
        clientes={clientes}
        onSubmit={(data) => {
          actualizar(data);
        }}
      />
    </Drawer>
  );
}