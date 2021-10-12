import Express from 'express';
import {getDB} from '../../db/db.js';

const rutasProductos=Express.Router();

rutasProductos.route("/productos").get((req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
    
    conexion.collection("productos").find({}).limit(50).toArray((err,result)=>{
        if(err){
           res.status(400).send("error consultando los productos")
        }else{
            res.json(result);
       }
   })
});

rutasProductos.route("/productos/nuevo").post((req,res)=>{
    const datosproductos=req.body;
    console.log("llaves: ", Object.keys(datosproductos))
    try{
        if(
           Object.keys(datosproductos).includes("id_producto")&&
           Object.keys(datosproductos).includes("nombreProducto")&&
           Object.keys(datosproductos).includes("proveedor")&&
           Object.keys(datosproductos).includes("cantidad")&&
           Object.keys(datosproductos).includes("precio")&&
           Object.keys(datosproductos).includes("fechaIngreso")
        ){
         //Implentar codigo para crear nuevo producto en la bd
         conexion.collection('productos').insertOne(datosproductos,(err,result)=>{
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

rutasProductos.route("/productos/editar").patch((req, res)=>{
    const edicion=req.body;
    const idactualizar={_id:new ObjectId(edicion.id)}
    delete edicion.id;
    const operacion={
        $set:edicion
    }
    conexion.collection("productos").findOneAndUpdate(idactualizar,operacion,{upsert:true,returnOrignal:true},(err,result)=>{
        if(err){
            console.error("Error actualizando el producto",err)
            res.sendStatus(500);
        }else{
            console.log(result)
            res.sendStatus(200)
        }
    })

});

rutasProductos.route('/productos/eliminar').delete((req,res)=>{
    const filtroProducto={_id:new ObjectId(req.body.id)}
    conexion.collection("productos").deleteOne(filtroProducto,(err,result)=>{
        if(err){
            console.error("Error eliminado",err);
            res.sendStatus(500)
        }else{
            console.log("Eliminado con exito")
            res.sendStatus(200)
        }
    })
})
export default rutasProductos;