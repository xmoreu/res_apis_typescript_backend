import request from 'supertest'
import server from '../../server'

describe('POST /api/products',()=>{
    it('should display validation errors',async()=>{
        const response=await request(server).post('/api/products').send({ })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(402)

    })
    it(' should create a new product',async()=>{
        const response=await request(server).post('/api/products').send({
            name:"Teclado - testing",
            price:12
        })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')


    })

    it('should display validation price great tan 0',async()=>{
        const response=await request(server).post('/api/products').send({
            name:"Monitor curvo - testing",
            price:0
        })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.status).not.toBe(404)
       
    })
})

describe('GET /api/products',()=>{
    it('should check if api/products url exists',async()=>{
        const response=await request(server).get('/api/products')
        expect(response.status).not.toBe(404)

    })
    it('GET a json response0',async()=>{
        const response=await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)


    })
})


describe('GET /api/products/:id',()=>{
    it('Should return 404 response for non existent product',async()=>{
        const productId=2000
        const response=await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')


    })

    it('should check valid id',async()=>{
        const response=await request(server).get(`/api/products/sdfgsdfs`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })

    it('get a json response',async()=>{
        const response=await request(server).get(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

    })
})

describe('PUT /api/products(:id',()=>{
    it('should check valid id',async()=>{
        const response=await request(server)
                                .put(`/api/products/sdfgsdfs`)
                                .send({
                                    name:"Monitor curvo actializado   22222",
                                    price:400,
                                    availability:true
                                    })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })
    it('should dosplay validation error messages when updating',async()=>{
        const response=await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should validate price greater 0',async()=>{
        const response=await request(server)
                                            .put('/api/products/1')
                                            .send({
                                                    name:"Monitor curvo actializado   22222",
                                                    price:-400,
                                                    availability:true
                                            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio no es válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should return a 404 for a non existen product',async()=>{
        const productId=2000
        const response=await request(server)
                                            .put(`/api/products/${productId}`)
                                            .send({
                                                    name:"Monitor curvo actializado   22222",
                                                    price:400,
                                                    availability:true
                                            })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data',async()=>{
        const response=await request(server)
                                            .put(`/api/products/1`)
                                            .send({
                                                    name:"Monitor curvo actializado   22222",
                                                    price:400,
                                                    availability:true
                                            })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })

})

describe('PATCH /api/products:id',()=>{
    it('should return 404 respons fos a non existing product',async()=>{
        const productId=2000
        const response=await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should update product availability',async()=>{
        const response=await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id',()=>{
    it('should check a valid ID',async()=>{
        const response=await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')

    })
    it('should return a 404 response for a non-existent product',async()=>{
        const productId=2000
        const response=await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)

    })
    it('should delete product',async()=>{
        const response=await request(server).delete(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)


    })
})


