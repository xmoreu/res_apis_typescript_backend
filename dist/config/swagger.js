"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc")); // npm i swagger-jsdoc swagger-ui-express  i    npm i -D @types/swagger-jsdoc @types/swagger-ui-express
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related products'
            }
        ],
        info: {
            title: 'REST API Node.js/ Express / Typescript',
            version: "1.0.0",
            description: "API Docs for products"
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUiOptions = {
    customCss: `
       .topbar-wrapper .link{
       content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg')
       }
       .opblock-summary-method{
        background-color:'blue'
       }
    `,
    customSiteTitle: 'Documentación REST API Express'
};
exports.swaggerUiOptions = swaggerUiOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map