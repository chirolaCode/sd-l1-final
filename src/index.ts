import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {

  /*Con esta funcion analizaremos los comandos pasados por consola, y se utiliza minimist como fue
  sugerido para procesar los argumentos.
  */
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController(); //Se instancia el controlador encargado de las operaciones
  //sobre  las películas

  if (params.add) {
    /*Se crea el objeto peli con los datos pasados por consola, y el parámetro tags se divide con
    comillas para converlo en un array de etiquetas*/
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags.split(","),
    };
    const result = await controller.add(peli);
    console.log(result ? "Película agregada exitosamente" : "Error al agregar la película");

  } else if (params.get) {
    const peli = await controller.getOne({ id: params.get });
    if (peli) {
      console.log(`Película encontrada: ${peli.title}`);
        /*Si la película existe, se muestra su título, de lo contrario se lanza un error*/
    } else {
      console.log("Película no encontrada");
    }
  } else if (params.search) {

    /*Si el parámetro de búsqueda se encuentra presente, se busca en la lista de pelis ese parámetro*/
    const pelis = await controller.get({ search: { title: params.title, tag: params.tag } });
    if (pelis.length > 0) {
      pelis.forEach(peli => console.log(peli.title));
    } else {
      console.log("No se encontraron películas");
    }
  } else {
    /*Si no se pasa un parámetro válido, se muestra el mensaje indicándolo*/
    console.log("Comando no reconocido");
  }
}

main();
