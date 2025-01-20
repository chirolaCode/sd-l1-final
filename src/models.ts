import * as jsonfile from "jsonfile";


/*Se usa type porque permite definir un tipo simple que no requiere métodos ni atributos
adicionales, más allá de los ya definidos. Tampoco requiere la necesidad de instanciarlo como las
clases.*/
export type Peli = {
  id: number;
  title: string;
  tags: string[];
};

export class PelisCollection {
  private filePath = './pelis.json';

  /*Aquí utilizamos una función asincrónica que espera una promesa del tipo array de Peli luego de leer
  a pelis.json. Conviene hacerlo asíncrona porque puede ser muy timeconsuming la lectura del archivo*/
  async getAll(): Promise<Peli[]> {
    try {
      const data = await jsonfile.readFile(this.filePath);
      return data.peliculas || [];
    } catch (error) {
      console.error("Error al leer el archivo de películas:", error);
      return [];
      /*Devolvemos un array vacio si hay errores de lectura del archivo*/
    }
  }
  /*Se usa una función asíncrona para buscar por ID, ya que el esta utiliza el getAll que lee el archivo
  de peliculas, entonces conviene usar código asncrónico*/
  async getById(id: number): Promise<Peli> {
    const peliculas = await this.getAll();
    const peli = peliculas.find(peli => peli.id === id);
    return peli || { id: 0, title: `peli de la terminal ${id}`, tags: [] }; 
  //Si no se encuentra la peli con el id deseado, devolvemos un mensaje que incluye el id buscado.
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente && peliExistente.id !== 0) {
      return false;
    }
    /*Para el add nuevamente usamos código asíncrono ya que nos permite seguir ejecutando el programa
    mientras se ejecuta la acción de guardar nuevos datos en nuesto pelis.json */
    try {
      const peliculas = await this.getAll();
      const updatedPeliculas = [...peliculas, peli];
      await jsonfile.writeFile(this.filePath, { peliculas: updatedPeliculas });
      return true;
      //En el caso de que la peli ya exista, devolvemos error
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false;
    }
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const peliculas = await this.getAll();
    return peliculas.filter(peli => {
      const matchesTitle = options.title ? peli.title.includes(options.title) : true;
      const matchesTag = options.tag ? peli.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag;
    });
  }
}

/*En el search volvemos a usar promesas, ya que permite seguir ejecutando el programa mientras se realiza
la lectura y el filtrado de datos.*/
