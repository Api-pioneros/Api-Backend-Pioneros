//importe  de express tradicional:
// const express= require('express')

import Express, { response }  from "express";
import Cors from 'cors'
import { ObjectId } from "bson";
import dotenv from "dotenv";
import {conexionBD,getDB} from './db/db.js';
dotenv.config({path:'./.env'});

const app=Express();
app.use(Express.json());
app.use(Cors());

 
//Rutas Ventas
app.get("/ventas",(req,res)=>{
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

app.post("/ventas/nueva",(req,res)=>{
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

app.patch("/ventas/editar",(req, res)=>{
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



app.delete('/ventas/eliminar',(req,res)=>{
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

//Rutas Usuarios

app.get("/usuarios",(req,res)=>{
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
app.post("/usuarios/nuevo",(req,res)=>{
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

app.patch("/usuarios/editar",(req, res)=>{
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

app.delete('/usuarios/eliminar',(req,res)=>{
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

//Rutas Productos

app.get("/productos",(req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
    
    conexion.collection("productos").find({}).limit(50).toArray((err,result)=>{
        if(err){
           res.status(400).send("error consultando los productos")
        }else{
            res.json(result);
       }
   })
});

app.post("/productos/nuevo",(req,res)=>{
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

app.patch("/productos/editar",(req, res)=>{
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

app.delete('/productos/eliminar',(req,res)=>{
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


const main=()=>{
  return app.listen(process.env.PORT,()=>{
     console.log(`Escuchando el puerto ${process.env.PORT}`)
   });
     
};
conexionBD(main);