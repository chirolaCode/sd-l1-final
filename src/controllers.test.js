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
const ava_1 = __importDefault(require("ava"));
const controllers_1 = require("./controllers");
const models_test_1 = require("./models.test");
const TEST_ID = (0, models_test_1.getRandomId)();
const SOME_TITLE = "una peli " + TEST_ID;
const SOME_TAG = "tag " + TEST_ID;
const SECOND_TEST_ID = (0, models_test_1.getRandomId)();
const test = ava_1.default;
// # IMPORTANTE #
// apenas te clones este repo
// todos los test a continuación van a fallar
// comentalos y descomentá uno a uno a medida
// que vas avanzando en cada test
test.serial("Testeo PelisController get id (creado desde la terminal)", (t) => __awaiter(void 0, void 0, void 0, function* () {
    // testeo peli agregada desde el script test del package
    const controller = new controllers_1.PelisController();
    const peli = yield controller.getOne({ id: 4321865 });
    t.is(peli.title, "peli de la terminal 4321865");
}));
test.serial("Testeo PelisController get id", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.PelisController();
    yield controller.add({
        id: TEST_ID,
        title: SOME_TITLE,
        tags: ["classic", SOME_TAG],
    });
    const peli = yield controller.getOne({ id: TEST_ID });
    t.is(peli.title, SOME_TITLE);
}));
test.serial("Testeo PelisController search title", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.PelisController();
    yield controller.add({
        id: TEST_ID,
        title: SOME_TITLE,
        tags: ["classic", SOME_TAG],
    });
    const pelis = yield controller.get({ search: { title: TEST_ID.toString() } });
    t.is(pelis.length, 1);
    t.is(pelis[0].id, TEST_ID);
}));
test.serial("Testeo PelisController search tag", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.PelisController();
    yield controller.add({
        id: SECOND_TEST_ID,
        title: "otra peli un poco más divertida",
        tags: [SOME_TAG],
    });
    const pelis = yield controller.get({
        search: { title: "peli", tag: SOME_TAG },
    });
    const ids = pelis.map((b) => b.id);
    t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
}));
