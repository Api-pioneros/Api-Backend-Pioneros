import Express from 'express';
import {getDB} from '../../db/db.js';

const rutasVentas= Express.Router();


rutasVentas.route("/ventas").get((req,res)=>{
    const conexion=getDB()    
    console.log("alguien hizo get en la ruta /ventas")
    
    conexion.collection("ventas").find({}).limit(50).toArray((err,result)=>{
        if(err){
           res.status(400).send("error consultando los vehiculos")
        }else{
            res.json(result);
       }
   })
});

rutasVentas.route("/ventas/nueva").post((req,res)=>{
    const conexion=getDB()
    const datosventas=req.body;
    console.log("llaves: ", Object.keys(datosventas))
    try{
        if(
           Object.keys(datosventas).includes("id_venta")&&
           Object.keys(datosventas).includes("fecha")&&
           Object.keys(datosventas).includes("producto")&&
           Object.keys(datosventas).includes("id_cliente")&&
           Object.keys(datosventas).includes("vendedor")&&
           Object.keys(datosventas).includes("cantidad")&&
           Object.keys(datosventas).includes("precio")
        ){
         //Implentar codigo para crear nueva venta en la bd
         conexion.collection('ventas').insertOne(datosventas,(err,result)=>{
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

rutasVentas.route("/ventas/editar").patch((req, res)=>{
    const conexion=getDB()
    const edicion=req.body;
    const idactualizar={_id:new ObjectId(edicion.id)}
    delete edicion.id;
    const operacion={
        $set:edicion
    }
    conexion.collection("ventas").findOneAndUpdate(idactualizar,operacion,{upsert:true,returnOrignal:true},(err,result)=>{
        if(err){
            console.error("Error actualizando el vehiculo",err)
            res.sendStatus(500);
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    })

});


rutasVentas.route('/ventas/eliminar').delete((req,res)=>{
    const conexion=getDB()
    const filtroVenta={_id:new ObjectId(req.body.id)}
    conexion.collection("ventas").deleteOne(filtroVenta,(err,result)=>{
        if(err){
            console.error("Error eliminado",err);
            res.sendStatus(500)
        }else{
            console.log("Eliminado con exito")
            res.sendStatus(200)
        }
    })
})

export default rutasVentas;