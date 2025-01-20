import { PelisCollection, Peli } from "./models";


/*Definiendo el tipo Options, podemos especificar las opciones de búsqueda*/
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;
  //Model se encarga de interactuar con los datos de las películas.
  constructor() {
    this.model = new PelisCollection();
    //Con esta arquitectura separamos la lógica de la "base de datos" del resto de la app
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    } else if (options?.search) {
      return this.model.search(options.search);
    } else {
      return this.model.getAll();
    }
  }
  //usamos funcion asincrona para evitar que el programa se trabe esperando información procesada
  async getOne(options: Options): Promise<Peli> {
    const pelis = await this.get(options);
    // Si no se encuentra ninguna película, devolver un objeto vacío
    return pelis.length > 0 ? pelis[0] : { id: 0, title: `peli de la terminal ${options.id}`, tags: [] };
  }

  //Agregamos la nueva película de manera asincrónica para no demorar el programa de manera innecesaria
  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };
