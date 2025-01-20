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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelisController = void 0;
const models_1 = require("./models");
class PelisController {
    //Model se encarga de interactuar con los datos de las películas.
    constructor() {
        this.model = new models_1.PelisCollection();
        //Con esta arquitectura separamos la lógica de la "base de datos" del resto de la app
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options === null || options === void 0 ? void 0 : options.id) {
                const peli = yield this.model.getById(options.id);
                return peli ? [peli] : [];
            }
            else if (options === null || options === void 0 ? void 0 : options.search) {
                return this.model.search(options.search);
            }
            else {
                return this.model.getAll();
            }
        });
    }
    //usamos funcion asincrona para evitar que el programa se trabe esperando información procesada
    getOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pelis = yield this.get(options);
            // Si no se encuentra ninguna película, devolver un objeto vacío
            return pelis.length > 0 ? pelis[0] : { id: 0, title: `peli de la terminal ${options.id}`, tags: [] };
        });
    }
    //Agregamos la nueva película de manera asincrónica para no demorar el programa de manera innecesaria
    add(peli) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.add(peli);
        });
    }
}
exports.PelisController = PelisController;
