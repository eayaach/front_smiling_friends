const cartas = import.meta.glob('../img/Cartas/*.png', {eager: true, as: 'url'});
const mapas = import.meta.glob('../img/mapas/*.jpg', {eager: true, as: 'url'});
const skins = import.meta.glob('../img/skins/*.jpg', {eager: true, as: 'url'});

async function cargar_cartas() {
    const image_dir = {}
    for (const path in cartas) {
        const imageName = path.match(/(\d+).png$/)[1]; // Extrae el número de la imagen
        
        const imageModule = await cartas[path];  // Carga la imagen
        image_dir[imageName] = imageModule; // Asigna la imagen al objeto images
    }
    return image_dir
}

async function cargar_mapas() {
    const image_dir = {}
    for (const path in mapas) {
        const imageName = path.match(/(\d+).jpg$/)[1]; // Extrae el número de la imagen
        
        const imageModule = await mapas[path];  // Carga la imagen
        image_dir[imageName] = imageModule; // Asigna la imagen al objeto images
    }
    return image_dir
}

async function cargar_skins() {
    const image_dir = {}
    for (const path in skins) {
        const imageName = path.match(/(\d+).jpg$/)[1]; // Extrae el número de la imagen
        
        const imageModule = await skins[path];  // Carga la imagen
        image_dir[imageName] = imageModule; // Asigna la imagen al objeto images
    }
    return image_dir
}

export  {cargar_cartas, cargar_mapas, cargar_skins}