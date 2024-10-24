import {url} from '../models/UrlSchema.js';

async function handleNewUrl(req, res, next){
    try{
        if(!req.body.fullUrl){
            return res.status(400).json({msg: 'Provide a URL'});
        }
        
        const urlSchema = {
            short: '5991',
            long: req.body.fullUrl,
        }

        const docs = new url(urlSchema);
        const result = await docs.save();

        return res.status(201).json({msg: 'success', data: result});
        
    }catch(e){
        next(e);
    }
}

async function handleGetUrl(req, res, next){
    try{
        const code = req.params.code;

        const query = {'short': code};

        const options = {
            projection: {_id: 0, long: 1}
        }

        const longUrl = await url.findOne(query, null, options);

        return res.status(200).json({msg: 'success', data: longUrl.long});
    }catch(e){
        next(e);
    }
}


export {
    handleNewUrl,
    handleGetUrl
}