"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("./handlers/product");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 49
 *                  price:
 *                      type: integer
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 *
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type : array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
// Routers de consulta GET
router.get('/', product_1.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product with an id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The id to find
 *            required: true
 *            schema:
 *                  type: integer
 *      responses:
 *            200:
 *                  description: Succesful response
 *                  content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Product'
 *            404:
 *                  description: Not found
 *            400:
 *                  description: Bad request
 */
router.get('/:id', 
//Validacion de un parámetro
(0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.getProductById);
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Product
 *      description: Returns a new record in the database
 *      requestBody:
 *            required: true
 *            content:
 *                  application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "Monitor curvo"
 *                                  price:
 *                                      type: number
 *                                      example: 399
 *      responses:
 *          201:
 *              description: Succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                               $ref: '#/components/schemas/Product'
 *
 *          400:
 *              description: Bad request
 *
 *
 */
//Router de inserción POST
router.post('/', 
//Validacion
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de oriducto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio no puede ser vacío')
    .custom(value => value > 0).withMessage('El precio no es válido'), middleware_1.handleInputErrors, product_1.createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The id to find
 *            required: true
 *            schema:
 *                  type: integer
 *      requestBody:
 *            required: true
 *            content:
 *              application/json:
 *
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Monitor curvo de 49
 *                              price:
 *                                  type: integer
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *      responses:
 *          200:
 *              description: Succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                               $ref: '#/components/schemas/Product'
 *
 *          400:
 *              description: Bad request - Invalid ID or invalid input data
 *          404:
 *              description: Product not found
 *
 *
 */
//Router de edición PUT y PATCH
router.put('/:id', 
//Validacion
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de oriducto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio no puede ser vacío')
    .custom(value => value > 0).withMessage('El precio no es válido'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Velor para la disponibilidad no válido'), 
//Validacion de un parámetro
(0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.updateProduct);
/**
* @swagger
* /api/products/{id}:
*  patch:
*      summary: Updates a productavailability
*      tags:
*          - Products
*      description: Returns the updated availability
*      parameters:
*          - in: path
*            name: id
*            description: The id to find
*            required: true
*            schema:
*                  type: integer
*
*      responses:
*          200:
*              description: Succesful
*              content:
*                  application/json:
*                      schema:
*                               $ref: '#/components/schemas/Product'
*
*          400:
*              description: Bad request - Invalid ID or invalid input data
*          404:
*              description: Product not found
*
*
*/
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.updateAvailability);
/**
* @swagger
* /api/products/{id}:
*  delete:
*      summary: Delete a product
*      tags:
*          - Products
*      description: Returns the updated availability
*      parameters:
*          - in: path
*            name: id
*            description: The id to find
*            required: true
*            schema:
*                  type: integer
*
*      responses:
*          200:
*              description: Succesful
*              content:
*                  application/json:
*                      schema:
*                               type: object
*                               properties:
*                                  data:
*                                       type: integer
*                                       example: Producto eliminado
*
*
*          400:
*              description: Bad request - Invalid ID or invalid input data
*          404:
*              description: Product not found
* */
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), middleware_1.handleInputErrors, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map