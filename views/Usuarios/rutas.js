import Express from 'express';
import {getDB} from '../../db/db.js'

const rutasUsuarios=Express.Router();


rutasUsuarios.route("/usuarios").get((req,res)=>{
    const conexion=getDB()
    console.log("alguien hizo get en la ruta /usuarios")
    conexion.collection("usuarios").find({}).limit(50).toArray((err,result)=>{
        if(err){
           res.status(400).send("error consultando los vehiculos")
        }else{
            res.json(result);
       }
   })
    
});
rutasUsuarios.route("/usuarios/nuevo").post((req,res)=>{
    const conexion=getDB()
    const datosusuarios=req.body;
    console.log("llaves: ", Object.keys(datosusuarios))
    try{
        if(
           Object.keys(datosusuarios).includes("id_usuario")&&
           Object.keys(datosusuarios).includes("nombre")&&
           Object.keys(datosusuarios).includes("apellido")&&
           Object.keys(datosusuarios).includes("cedula")&&
           Object.keys(datosusuarios).includes("correo")&&
           Object.keys(datosusuarios).includes("rol")
           
        ){
         //Implentar codigo para crear nueva venta en la bd
         conexion.collection('usuarios').insertOne(datosusuarios,(err,result)=>{
             if(err){
                 console.error(err)
                 res.sendStatus(500);
             }else{
                 console.log(result)
                 res.sendStatus(200);
             }
         });
          
         }else{
                res.sendStatus(500)
              }
    }catch{
        res.sendStatus(500) 
    }
    
    console.log("Exito")
       
    
});

rutasUsuarios.route("/usuarios/editar").patch((req, res)=>{
    const conexion=getDB()
    const edicion1=req.body;
    const idactualizar={_id:new ObjectId(edicion1.id)}
    delete edicion1.id;
    const operacion={
        $set:edicion1
    }
    conexion.collection("usuarios").findOneAndUpdate(idactualizar,operacion,{upsert:true,returnOrignal:true},(err,result)=>{
        if(err){
            console.error("Error actualizando el vehiculo",err)
            res.sendStatus(500);
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    })

});

rutasUsuarios.route('/usuarios/eliminar').delete((req,res)=>{
    const conexion=getDB()
    const filtroUsuario={_id:new ObjectId(req.body.id)}
    conexion.collection("usuarios").deleteOne(filtroUsuario,(err,result)=>{
        if(err){
            console.error("Error eliminando",err);
            res.sendStatus(500)
        }else{
            console.log("Eliminado con exito")
            res.sendStatus(200)
        }
    })
})

export default rutasUsuarios;