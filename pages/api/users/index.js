//solo archivo de prueba

import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import User from "../../../models/users";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) =>{
    try{
        const user = await User.find({});

        res.status(200).json({success: true, data: user})
    }catch(error){
        res.status(400).json({success: false, Error: error})
    }
})



export default handler;