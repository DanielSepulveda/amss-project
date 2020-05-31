//solo archivo de prueba

import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import User from "../../../models/users";


const handler = nextConnect();

handler.use(middleware);

handler.get(async(req,res) =>{
    User.findOne({_id: req.query.id}).then(function(user){
        if(!user) {
            return res.status(404).send({ error: `User with id ${_id} not found.`})
          }
          return res.send(user.likes)
    }).catch(function(error){
        res.status(505).send({error: error})
    })
})



handler.put(async (req, res) =>{
    console.log(req.body)
    User.findOneAndUpdate({_id: req.query.id}, req.body, function(err, updated){
        if(err){
            res.json({Error: err});
        }
        res.json({Succes: "Usuario modificado con exito!"})
    }) 
}) 

export default handler;

