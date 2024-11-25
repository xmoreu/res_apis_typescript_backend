import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'   /////npm i dotenv

dotenv.config()
//console.log()
const db=new Sequelize(process.env.DATABASE_URL!,{
    dialectOptions:{
        ssl:{
            require:false
        }
    },
    models:[__dirname + '/../models/**/*'],
    logging:false
})

export default db