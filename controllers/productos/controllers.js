import { getDB } from "../../db/db.js"
import { ObjectId } from "bson";

const queryAllProductos = async (callback) => {
    const conexion = getDB();
    await conexion.collection("productos").find({}).limit(50).toArray(callback)
};
const crearProducto = async(datosproducto, callback) => {
    const conexion = getDB();
        //Implentar codigo para crear nueva venta en la bd
    await conexion.collection('productos').insertOne(datosproducto, callback);   

    
};
const editarProducto= async(id,edicion,callback)=>{
    const conexion=getDB()
    const idactualizar={_id:new ObjectId(id)}
    const operacion={
        $set:edicion
    }
    conexion.collection("productos").findOneAndUpdate(idactualizar,operacion,{upsert:true,returnOrignal:true},callback)
}
const eliminarProducto=async(req,callback)=>{
    const conexion=getDB()
    const filtroProducto={_id:new ObjectId(req)}
    await conexion.collection("productos").deleteOne(filtroProducto,callback);
    
}

export { queryAllProductos, crearProducto,editarProducto,eliminarProducto };