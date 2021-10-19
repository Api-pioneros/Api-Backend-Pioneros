import Express from 'express';
import { crearUsuario, editarUsuario, queryAllUsuarios ,eliminarUsuario} from '../../controllers/usuarios/controller.js';
import {getDB} from '../../db/db.js'

const rutasUsuarios=Express.Router();
const genericCallBack=(res)=>{
    return (err,result)=>{
        if(err){
            res.status(400).send("error consultando")
            console.log(err)
         }else{
             console.log("Consulta exitosa")
             res.json(result);
        }
    }
     
}


rutasUsuarios.route("/usuarios").get((req,res)=>{
    const conexion=getDB()
    console.log("alguien hizo get en la ruta /usuarios")
    queryAllUsuarios(genericCallBack(res))     
});

rutasUsuarios.route("/usuarios").post((req,res)=>{
    console.log("Entro aqui")
    crearUsuario(req.body,genericCallBack(res));   
});

rutasUsuarios.route("/usuarios/:id").patch((req, res)=>{
    editarUsuario(req.params.id, req.body,  genericCallBack(res));   

});

rutasUsuarios.route('/usuarios/:id').delete((req,res)=>{
    eliminarUsuario(req.params.id,genericCallBack(res));
})

export default rutasUsuarios;