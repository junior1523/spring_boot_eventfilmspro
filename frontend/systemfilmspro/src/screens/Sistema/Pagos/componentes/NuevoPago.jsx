
import Drawer from "../../../../componentes/drawer"
import BuscarContrato from "./BuscarContrato";
import { useState } from "react";

export default function NuevoPago({contratos, abrir, clientes, cerrar}) {


  return(
    <div>
        <Drawer 
        titulo="Nuevo Pago"
        abierto={abrir}
        cerrar={cerrar}
        >
          <BuscarContrato 
          contrato={contratos}
        
          />
        </Drawer>
    </div>
  )
}