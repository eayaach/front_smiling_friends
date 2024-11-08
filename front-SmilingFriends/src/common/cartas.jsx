// Usar import.meta.glob en lugar de require.context
const images = import.meta.glob('../img/Cartas/*.png');

console.log(images); // Muestra las rutas de las imágenes