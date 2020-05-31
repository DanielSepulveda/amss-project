import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import Category from "../../../models/category";


const handler = nextConnect();

handler.use(middleware);


const getIds = async(req,res) =>{
    console.log(req);
    res = await fetch('http://localhost:3000/api/users/' + req);
    const data = await res.json();
    console.log(data);
    return data;
}

handler.get(async(req,res)=>{
    var Ids = await getIds(req.query.users);
    console.log(Ids);
    Category.find({_id:{$in:Ids}}).then(function(categories){
        return res.send(categories);
    }).catch(function(error){
        return res.status(505).send({error: error});
    })
})

export default handler;