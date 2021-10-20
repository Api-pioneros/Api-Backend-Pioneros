import Express from 'express';
import {queryAllProductos,crearProducto, editarProducto,eliminarProducto} from '../../controllers/productos/controllers.js'


const rutasProductos=Express.Router();

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

rutasProductos.route("/productos").get((req,res)=>{
    console.log("alguien hizo get en la ruta /productos")
    queryAllProductos(genericCallBack(res))   
    
});

rutasProductos.route("/productos").post((req,res)=>{
    console.log("Entro aqui")
    crearProducto(req.body,genericCallBack(res));    
    
});


rutasProductos.route("/productos/:id").patch((req, res)=>{
    editarProducto(req.params.id, req.body,  genericCallBack(res));

});
rutasProductos.route('/productos/:id').delete((req,res)=>{
    eliminarProducto(req.params.id,genericCallBack(res));
   })


  
export default rutasProductos;