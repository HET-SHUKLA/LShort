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

const handleDeleteUrl = async (req, res, next) => {
    try{
        const {code} = req.params;

        const query = {short: code};
        const options = {
            projection: {_id: 0, userEmail: 1}
        };

        const email = await Url.findOne(query, null, options);
        
        if(req.useremail === email.userEmail){
            await Url.deleteOne({short: code});
            return res.status(200).json({msg: 'success'});
        }

        return res.status(401).json({msg: 'Unauthotized access'});
    }catch(e){
        next(e);
    }
}

const handleResetUrl = async (req, res, next) => {
    try {
        const {code} = req.params;

        const query = {short: code};
        const options = {
            projection: {_id: 0, userEmail: 1}
        };

        const email = await Url.findOne(query, null, options);
        
        if(req.useremail === email.userEmail){
            await Url.updateOne(
                {
                    short: code
                },
                {
                    $unset: {analytics: []}
                }
            );
            return res.status(200).json({msg: 'success'});
        }

        return res.status(401).json({msg: 'Unauthotized access'});
    } catch (error) {
        next(error);
    }
}

export{
    handleUserGet,
    handleGetUrls,
    handleDeleteUrl,
    handleResetUrl
}