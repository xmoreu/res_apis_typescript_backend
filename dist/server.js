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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importStar(require("./config/swagger"));
const cors_1 = __importDefault(require("cors")); //npm i cors
const morgan_1 = __importDefault(require("morgan")); // npm i morgan   npm i --save-dev @types/morgan   //Dona info al router del temps que s'ha fet una consulta de on ve etc
//Conectar a bd
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
    }
    catch (error) {
        console.log("Hubo un error al conectar a la BD");
    }
    //  console.log("Conexión exitosa a la BD")
}
connectDB();
const server = (0, express_1.default)();
//Permitir conexiones
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === undefined || origin === process.env.FRONTEND_URL) {
            console.log('Permitir...');
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
//Leer dators de formularios
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
//Routing
server.use('/api/products', router_1.default);
//Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, swagger_1.swaggerUiOptions));
exports.default = server;
//# sourceMappingURL=server.js.map