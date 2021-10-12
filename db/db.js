import { MongoClient } from "mongodb";
import dotenv from 'dotenv';


dotenv.config({path:'./.env'});

const stringConexion= process.env.DATABASE_URL;
const client= new MongoClient(stringConexion,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
let conexion;

const conexionBD=(callback)=>{
    client.connect((err,db)=>{
        if(err){
            console.error("error al conectar  la base de datos")
        }
        conexion=db.db("Pioneros");
        console.log("conexion existosa")
        return callback();
    });
};

const getDB=()=>{
    return conexion
}
export {conexionBD, getDB};