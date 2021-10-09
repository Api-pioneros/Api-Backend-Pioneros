//importe  de express tradicional:
// const express= require('express')

import Express, { response }  from "express";
import { MongoClient } from "mongodb";
import Cors from 'cors'
import { ObjectId } from "bson";


const stringConexion= "mongodb+srv://juandiego1628:16281530@proyectoapp.tv3zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client= new MongoClient(stringConexion,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

let conexion;
const app=Express();
app.use(Express.json());
app.use(Cors());

app.get("/ventas",(req,res)=>{
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

const main=()=>{
   client.connect((err,db)=>{
        if(err){
            console.error("error al conectar  la base de datos")
        }
        conexion=db.db("Pioneros");
        console.log("conexion existosa")
        return app.listen(5000,()=>{
            console.log("Escuchando el puerto 5000")
   });
 })
    
};
main();