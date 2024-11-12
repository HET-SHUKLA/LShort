import { Url } from "../models/UrlSchema.js";

const handleUserGet = (req, res) => {
    if(req.useremail){
        res.status(200).json({msg: 'success', data: req.useremail});
        return;
    }
    res.status(302).json({msg: 'token not found, redirects to the login page'});
}

const handleGetUrls = async (req, res, next) => {
    try{
        if(!req.useremail){
            res.status(404).json({msg: 'Unauthorized User'});
            return;
        }
        
        const query = {userEmail: req.useremail};

        const options = {
            projection: {short: 1, long: 1, count: 1}
        }

        const urlData = await Url.find(query, null, options);

        res.status(200).json({msg: 'success', data: urlData});
    }catch(e){
        next(e);
    }
}

export{
    handleUserGet,
    handleGetUrls
}