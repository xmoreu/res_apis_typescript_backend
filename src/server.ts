import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import cors,{CorsOptions} from 'cors'//npm i cors
import morgan from 'morgan'// npm i morgan   npm i --save-dev @types/morgan   //Dona info al router del temps que s'ha fet una consulta de on ve etc

//Conectar a bd
export async function connectDB() {


  try {
    await db.authenticate()
    db.sync()

  } catch (error) {
    console.log("Hubo un error al conectar a la BD")
  }


  //  console.log("Conexión exitosa a la BD")

}
connectDB()

const server = express()

//Permitir conexiones


const corsOptions:CorsOptions={
  origin:function(origin,callback){
      if(origin===undefined || origin===process.env.FRONTEND_URL)    {
        console.log('Permitir...')
        callback(null,true)
      }else{
        callback(new Error('Error de CORS'))
      }
  }
}
server.use(cors(corsOptions))
//Leer dators de formularios

server.use(express.json())

server.use(morgan('dev'))

//Routing

server.use('/api/products', router)


//Docs
server.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec,swaggerUiOptions))

export default server




