import { getDB } from "../../db/db.js"
import { ObjectId } from "bson";
import jwt_decode from "jwt-decode";

const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion.collection("usuarios").find({}).limit(50).toArray(callback)
};


const crearUsuario = async (datosUsuarios, callback) => {
        const conexion = getDB();
        //Implentar codigo para crear nueva venta en la bd
        await conexion.collection('usuarios').insertOne(datosUsuarios, callback);
        console.log("creacion exitosa") ;    
};

const consultarOCrearUsuario = async(req,callback)=>{
    //6.1 Obtener los datos usuarios desde el token
    const token= req.headers.authorization.split('Bearer')[1];
    const user= jwt_decode(token)['http://localhost/userData'];
    console.log(user)
    //6.2 Con el correo del usuarioo o el Id verificar si esta enla bd
    const conexion = getDB();
    await conexion.collection('usuarios').findOne({email:user.email},async (err,response)=>{
        console.log("response consulta bd", response);
         if(response){
         //7.1 Si el usuario esta en la bd devuelve la info del usuario   
         }else{
        //7.2. si el usuario no esta lo crea y devuelve la info
         user.auth0ID=user._id
         delete user._id
         user.rol="Inactivo"
        await crearUsuario(user,(err,respuesta)=>callback(err,user))
          
         }
    });       
    

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

export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario,consultarOCrearUsuario };