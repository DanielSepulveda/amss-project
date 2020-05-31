import nextConnect from "next-connect";
import Category from "../../../models/category";
import middleware from "../../../middlewares";


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) =>{
    try{
        const categories = await Category.find({_id:req.query.id});

        res.status(200).json({success: true, data: categories})
    }catch(error){
        res.status(400).json({success: false, Error: error})
    }
})

handler.put(async (req, res) =>{
    try {
        const cat = await Category.findOneAndUpdate({_id:req.query.id}, req.body);
        if(!cat){
            res.status(400).json({success: false, error: "Not found category"})
        }
        res.status(200).json({success: true, data: category})
    } catch (error) {
        res.status(400).json({success: false, Error: error})
    }
})

handler.delete(async (req,res) => {
    const _id = req.query.id;
    try {
        const deleteCat = await Category.findOneAndDelete({_id:req.query.id});
        if(!cat){
            res.status(400).json({success: false, error: "Not found category"});
        }
        res.status(200).json({success: true, description: `Category with id ${req.query.id} deleted.`});
    } catch (error) {
        res.status(400).json({success: false, Error: error});
    }
})

export default handler;