import swaggerJSDoc from "swagger-jsdoc";  // npm i swagger-jsdoc swagger-ui-express  i    npm i -D @types/swagger-jsdoc @types/swagger-ui-express
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
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
    apis:['./src/router.ts']
}
const swaggerSpec=swaggerJSDoc(options)

const swaggerUiOptions:SwaggerUiOptions={
    customCss:`
       .topbar-wrapper .link{
       content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg')
       }
       .opblock-summary-method{
        background-color:'blue'
       }
    `,
    customSiteTitle:'Documentación REST API Express'
}

export default swaggerSpec

export {
    swaggerUiOptions
}