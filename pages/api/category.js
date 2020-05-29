import nextConnect from "next-connect";
import Category from "../../models/category";
import middleware from "../../middlewares";


const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) =>{
    try{
        const category = await Category.create(req.body);
        res.status(200).json({succes: true, data: category})
    }catch(error){
        res.status(400).json({succes: false, Error: error})
    }
})

handler.get(async (req, res) =>{
    try{
        const categories = await Category.find({});

        res.status(200).json({succes: true, data: categories})
    }catch(error){
        res.status(400).json({succes: false, Error: error})
    }
})

export default handler;