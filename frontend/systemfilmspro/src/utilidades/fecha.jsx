export const enRango = (fechaStr, inicio, fin) => {
    const [a, m, d] = fechaStr.split("-").map(Number);
    const f = new Date(a, m - 1, d);
    const i = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
    const fi = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());
    return f >= i && f <= fi;
};