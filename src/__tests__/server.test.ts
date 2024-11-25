// npm i -D supertest @types/supertest jest @types/jest ts-jest
// npx ts-jest config:init

import {connectDB} from "../server"
import db from "../config/db"


//Prova que es llença la excepció i retorna l'escrit de console log
jest.mock('../config/db')
describe('connectDB',()=>{
    it('should handle database connection erro',async()=>{
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy=jest.spyOn(console,'log') 
        await connectDB()   
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})