import { useEffect, useState } from "react";

export const useEventos = () => {
   const [eventos, setEventos] = useState([]);

   useEffect(() => {
      fetch("/eventos.json")
         .then(res => res.json())
         .then(data => {
            setEventos(data.eventos)
            console.log(data)
         })
         .catch(err => console.error(err));
   }, []);

   return { eventos };
};