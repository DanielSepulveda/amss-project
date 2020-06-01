import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import Review from "../../../models/reviews";
import extractUser from "../../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.get(async(req,res) =>{
    //const user = extractUser(req);
    const reviews = await Review.find({});
    res.status(200).json({reviews})
});




handler.post(async(req,res) =>{
    try {
        const review = await Review.create(req.body);
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        res.status(400).json({ success: false, Error: error });
    }
});

const getPlaceInfo = async(req, res) =>{ //para uso despues
    infoSend = req;
    try {
        const res = await fetch("/api/places?action=ONEPLACE", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: infoSend,
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        console.log(data);
    } catch (e) {
        res.send({error: e});
    }
}

export default handler;
