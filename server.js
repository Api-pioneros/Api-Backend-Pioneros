//importe  de express tradicional:
// const express= require('express')

import Express from "express";
import Cors from 'cors'
import dotenv from "dotenv";
import {conexionBD} from './db/db.js';
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/Usuarios/rutas.js";
import rutasProductos from "./views/productos/ruta.js";
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

dotenv.config({path:'./.env'});

const app=Express();
app.use(Express.json());
app.use(Cors());
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://misiontic-pioneros.us.auth0.com/.well-known/jwks.json'
}),
audience: 'Backend-Api-Autenticacion-Pioneros-Misiontic',
issuer: 'https://misiontic-pioneros.us.auth0.com/',
algorithms: ['RS256']
});
// 4 y 5 enviarle token al auth0 para que valide si esta bueno ono.

app.use(jwtCheck)
app.use(rutasVentas);
app.use(rutasUsuarios);
app.use(rutasProductos);






const main=()=>{
  return app.listen(process.env.PORT,()=>{
     console.log(`Escuchando el puerto ${process.env.PORT}`)
   });
     
};
conexionBD(main);