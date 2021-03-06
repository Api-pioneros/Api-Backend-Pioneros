import Express from 'express';
import { queryAllVentas, crearVenta, editarVenta, eliminarventa } from '../../controllers/ventas/controller.js';


const rutasVentas= Express.Router();

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


rutasVentas.route("/ventas").get((req,res)=>{
    console.log("alguien hizo get en la ruta /ventas")
    queryAllVentas(genericCallBack(res));
});

rutasVentas.route("/ventas").post((req,res)=>{
    console.log("Entro aqui")
    crearVenta(req.body,genericCallBack(res));    
    
});

rutasVentas.route("/ventas/:id").patch((req, res)=>{
    editarVenta(req.params.id, req.body,  genericCallBack(res));

});


rutasVentas.route('/ventas/:id').delete((req,res)=>{
 eliminarventa(req.params.id,genericCallBack(res));
})

export default rutasVentas;