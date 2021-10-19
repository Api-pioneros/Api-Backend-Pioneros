import { getDB } from "../../db/db.js"
import { ObjectId } from "bson";

const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion.collection("usuarios").find({}).limit(50).toArray(callback)
};

const crearUsuario = async (datosUsuarios, callback) => {
    if (
        Object.keys(datosUsuarios).includes('id_usuario') &&
        Object.keys(datosUsuarios).includes('nombre') &&
        Object.keys(datosUsuarios).includes('apellido') &&
        Object.keys(datosUsuarios).includes('cedula') &&
        Object.keys(datosUsuarios).includes('correo') &&
        Object.keys(datosUsuarios).includes('rol')
    ) {
        const conexion = getDB();
        //Implentar codigo para crear nueva venta en la bd
        console.log("entro aquiII")
        await conexion.collection('usuarios').insertOne(datosUsuarios, callback);
    } else {
        return () => {
            console.log("Error")
        };
    }
};

const editarUsuario = async (id, edicion, callback) => {
    const conexion = getDB()
    const idactualizar = { _id: new ObjectId(id) }
    const operacion = {
        $set: edicion
    }
    conexion.collection("usuarios").findOneAndUpdate(idactualizar, operacion, { upsert: true, returnOrignal: true }, callback)
}

const eliminarUsuario = async (req, callback) => {
    const conexion = getDB()
    const filtroUsuario = { _id: new ObjectId(req) }
    await conexion.collection("usuarios").deleteOne(filtroUsuario, callback);

}

export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario };