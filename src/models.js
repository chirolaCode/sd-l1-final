"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelisCollection = void 0;
const jsonfile = __importStar(require("jsonfile"));
class PelisCollection {
    constructor() {
        this.filePath = './pelis.json';
    }
    /*Aquí utilizamos una función asincrónica que espera una promesa del tipo array de Peli luego de leer
    a pelis.json. Conviene hacerlo asíncrona porque puede ser muy timeconsuming la lectura del archivo*/
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield jsonfile.readFile(this.filePath);
                return data.peliculas || [];
            }
            catch (error) {
                console.error("Error al leer el archivo de películas:", error);
                return [];
                /*Devolvemos un array vacio si hay errores de lectura del archivo*/
            }
        });
    }
    /*Se usa una función asíncrona para buscar por ID, ya que el esta utiliza el getAll que lee el archivo
    de peliculas, entonces conviene usar código asncrónico*/
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const peliculas = yield this.getAll();
            const peli = peliculas.find(peli => peli.id === id);
            return peli || { id: 0, title: `peli de la terminal ${id}`, tags: [] };
            //Si no se encuentra la peli con el id deseado, devolvemos un mensaje que incluye el id buscado.
        });
    }
    add(peli) {
        return __awaiter(this, void 0, void 0, function* () {
            const peliExistente = yield this.getById(peli.id);
            if (peliExistente && peliExistente.id !== 0) {
                return false;
            }
            /*Para el add nuevamente usamos código asíncrono ya que nos permite seguir ejecutando el programa
            mientras se ejecuta la acción de guardar nuevos datos en nuesto pelis.json */
            try {
                const peliculas = yield this.getAll();
                const updatedPeliculas = [...peliculas, peli];
                yield jsonfile.writeFile(this.filePath, { peliculas: updatedPeliculas });
                return true;
                //En el caso de que la peli ya exista, devolvemos error
            }
            catch (error) {
                console.error("Error al agregar la película:", error);
                return false;
            }
        });
    }
    search(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const peliculas = yield this.getAll();
            return peliculas.filter(peli => {
                const matchesTitle = options.title ? peli.title.includes(options.title) : true;
                const matchesTag = options.tag ? peli.tags.includes(options.tag) : true;
                return matchesTitle && matchesTag;
            });
        });
    }
}
exports.PelisCollection = PelisCollection;
/*En el search volvemos a usar promesas, ya que permite seguir ejecutando el programa mientras se realiza
la lectura y el filtrado de datos.*/
