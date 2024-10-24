import {url} from '../models/UrlSchema.js';
import Hashids from 'hashids';

function generateCodeFromUrl(shortU){
    const salt = shortU+Date.now();
    const hashids = new Hashids(salt, 5);

    const ran1 = Math.floor(Math.random() * 10000);
    const ran2 = Math.floor(Math.random() * 10000);

    const hash = hashids.encode(ran1,ran2);
    return hash;
}

async function findExistingUrl(full){
    const query = {'long': full};

    return await url.findOne(query);
}

async function handleNewUrl(req, res, next){
    try{

        const full = req.body.fullUrl;

        if(!full){
            return res.status(400).json({msg: 'Provide a URL'});
        }

        const ans = await findExistingUrl(full);

        if(ans){
            return res.status(201).json({msg: 'success', data: ans.short});
        }

        const urlSchema = {
            short: generateCodeFromUrl(full),
            long: full,
        }

        const docs = new url(urlSchema);
        const result = await docs.save();

        return res.status(201).json({msg: 'success', data: result.short});
        
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