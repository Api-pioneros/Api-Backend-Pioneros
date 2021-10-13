import { getDB } from "../../db/db.js"
import { ObjectId } from "bson";

const queryAllVentas = async (callback) => {
    const conexion = getDB();
    await conexion.collection("ventas").find({}).limit(50).toArray(callback)
};

const crearVenta = async(datosventas, callback) => {
    if (
        Object.keys(datosventas).includes("id_venta") &&
        Object.keys(datosventas).includes("fecha") &&
        Object.keys(datosventas).includes("producto") &&
        Object.keys(datosventas).includes("id_cliente") &&
        Object.keys(datosventas).includes("vendedor") &&
        Object.keys(datosventas).includes("cantidad") &&
        Object.keys(datosventas).includes("precio")
    ) {
        
        const conexion = getDB();
        //Implentar codigo para crear nueva venta en la bd
        await conexion.collection('ventas').insertOne(datosventas, callback);
    } else {
        return ()=>{
            console.log("Error")
        };

    }

    
};

const editarVenta= async(edicion,callback)=>{
    const conexion=getDB()
    const idactualizar={_id:new ObjectId(edicion)}
    delete edicion.id
    const operacion={
        $set:edicion
    }
    conexion.collection("ventas").findOneAndUpdate(idactualizar,operacion,{upsert:true,returnOrignal:true},callback)
}

const eliminarventa=async(req,callback)=>{
    const conexion=getDB()
    const filtroVenta={_id:new ObjectId(req)}
    await conexion.collection("ventas").deleteOne(filtroVenta,callback);
    
}

export { queryAllVentas, crearVenta, editarVenta, eliminarventa };