import {url} from '../models/UrlSchema.js';

async function handleNewUrl(req, res, next){
    try{
        if(!req.body.fullUrl){
            return res.status(400).json({msg: 'Provide a URL'});
        }
        
        const urlSchema = {
            short: 'example/1799',
            long: req.body.fullUrl,
        }

        const docs = new url(urlSchema);
        const result = await docs.save();

        return res.status(201).json({msg: 'success', data: result});
        
    }catch(e){
        next(e);
    }
}


export {
    handleNewUrl
}