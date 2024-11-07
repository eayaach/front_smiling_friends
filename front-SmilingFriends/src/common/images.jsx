import React from "react";

const images = import.meta.glob('../img/Cartas/*.png', {eager: true, as: 'url'});

export async function cargar_cartas() {
    const image_dir = {}
    for (const path in images) {
        const imageName = path.match(/(\d+).png$/)[1]; // Extrae el número de la imagen
        console.log(imageName);
        const imageModule = await images[path];  // Carga la imagen
        image_dir[imageName] = imageModule; // Asigna la imagen al objeto images
    } 
    return image_dir
}