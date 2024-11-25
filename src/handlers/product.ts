
import { Request, Response } from "express"
import Product from "../models/Product.model"
import { check, validationResult } from "express-validator"


export const getProducts = async (req: Request, res: Response) => {
  
        const products = await Product.findAll({
            order: [
                ['id', 'desc']
            ],
           // limit: 5,
         //   attributes: { exclude: ['createdAt', 'updatedAt', 'availability', 'id'] }
        })
        res.json({ data: products })
    
}
export const getProductById = async (req: Request, res: Response) => {
  
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' })
            return
        }
        res.json({ data: product })

   
}
export const createProduct = async (req: Request, res: Response) => {
  
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
   


}

export const updateProduct = async (req: Request, res: Response) => {
  
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' })
            return
        }
        //Actualizar
        // await product.update(req.body)  // Update sólo hace modificaciones parciales, los campos que no ponga no se modifican y PUT deberia de actualizar el registro entero

        product.update(req.body)

        await product.save()

        res.json({ data: product })

    
}

export const updateAvailability = async (req: Request, res: Response) => {
   
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' })
            return
        }
        //Actualizar
        // await product.update(req.body)  // Update sólo hace modificaciones parciales, los campos que no ponga no se modifican y PUT deberia de actualizar el registro entero
        product.set('availability', !product.dataValues.availability)
        await product.save()

        res.json({ data: product })

   
}

export const deleteProduct = async (req: Request, res: Response) => {
   
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' })
            return
        }
        await product.destroy()

        res.json({ data: 'Producto eliminado' })

   
}