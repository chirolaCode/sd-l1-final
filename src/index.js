"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const controllers_1 = require("./controllers");
function parseaParams(argv) {
    return (0, minimist_1.default)(argv);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /*Con esta funcion analizaremos los comandos pasados por consola, y se utiliza minimist como fue
        sugerido para procesar los argumentos.
        */
        const params = parseaParams(process.argv.slice(2));
        const controller = new controllers_1.PelisController(); //Se instancia el controlador encargado de las operaciones
        //sobre  las películas
        if (params.add) {
            /*Se crea el objeto peli con los datos pasados por consola, y el parámetro tags se divide con
            comillas para converlo en un array de etiquetas*/
            const peli = {
                id: params.id,
                title: params.title,
                tags: params.tags.split(","),
            };
            const result = yield controller.add(peli);
            console.log(result ? "Película agregada exitosamente" : "Error al agregar la película");
        }
        else if (params.get) {
            const peli = yield controller.getOne({ id: params.get });
            if (peli) {
                console.log(`Película encontrada: ${peli.title}`);
                /*Si la película existe, se muestra su título, de lo contrario se lanza un error*/
            }
            else {
                console.log("Película no encontrada");
            }
        }
        else if (params.search) {
            /*Si el parámetro de búsqueda se encuentra presente, se busca en la lista de pelis ese parámetro*/
            const pelis = yield controller.get({ search: { title: params.title, tag: params.tag } });
            if (pelis.length > 0) {
                pelis.forEach(peli => console.log(peli.title));
            }
            else {
                console.log("No se encontraron películas");
            }
        }
        else {
            /*Si no se pasa un parámetro válido, se muestra el mensaje indicándolo*/
            console.log("Comando no reconocido");
        }
    });
}
main();
