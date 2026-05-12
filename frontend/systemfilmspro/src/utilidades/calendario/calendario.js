export const fechaActual = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();

    return { año,mes}
}


export const diasMes = ({año,mes}) => {

    const primerDia = new Date(año, mes, 0).getDay();
    const todosLosDias = new Date(año, mes + 1, 0).getDate();

    const dias = [];
    for (let i = 0; i < primerDia; i++) {
        dias.push(null);
    }
    for (let i = 1; i <= todosLosDias; i++) {
        dias.push(i)
    }

    return dias;
}

