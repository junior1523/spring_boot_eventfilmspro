import { useEffect, useState } from "react"

export const useTiposEventos = () => {
   const [tipoEventos, setTipoEventos ]= useState([]);

   useEffect(() => {

    fetch("/tipos_eventos.json")
    .then(res => res.json())
    .then(data => {
        setTipoEventos(data.tiposEventos);
        console.log(data)
    })
    .catch(err => console.error(err))
   }, []);

   return{
     tipoEventos
   }
}