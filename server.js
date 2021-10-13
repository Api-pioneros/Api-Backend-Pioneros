//importe  de express tradicional:
// const express= require('express')

import Express from "express";
import Cors from 'cors'
import dotenv from "dotenv";
import {conexionBD} from './db/db.js';
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/Usuarios/rutas.js";
import rutasProductos from "./views/productos/ruta.js";

dotenv.config({path:'./.env'});

const app=Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);
app.use(rutasUsuarios);
app.use(rutasProductos);


const main=()=>{
  return app.listen(process.env.PORT,()=>{
     console.log(`Escuchando el puerto ${process.env.PORT}`)
   });
     
};
conexionBD(main);