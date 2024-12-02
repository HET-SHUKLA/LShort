import {Url} from '../models/UrlSchema.js';
import Hashids from 'hashids';
import validator from 'validator';
import uap from 'ua-parser-js';
import axios from 'axios';
import { ipToken } from '../config.js';

async function findExistingShort(short){
    const query = {'short': short};

    return await Url.findOne(query);
}

function getIPv4(ip) {
    if (ip.startsWith('::ffff:')) {
      return ip.replace('::ffff:', ''); 
    }
    return ip;
}

async function getIpData(ip4){
    const ipReq = `https://ipinfo.io/${ip4}`;
    
    const instance = axios.create({
        baseURL: ipReq,
        headers: {'Authorization': `Bearer ${ipToken}`}
    });
      
    const res = await instance.get('');    
    return res.data;
}

async function getUserDetail(code, ua, ip){

    //Ip Data

    const ip4 = getIPv4(ip);
    const data = await getIpData(ip4);
    
    const ipData = {
        'city': data.city || 'not fetched',
        'region' : data.region || 'not fetched',
        'country' : data.country || 'not fetched',
        'loc' : data.loc || 'not fetched',
    }

    //Current Time
    const currTime = Date.now();

    //ua
    const userAgent = {
        'browser': ua.browser.name,
        'os': ua.os.name + ' ' + ua.os.version,
    }

    const obj = {ipData, currTime, userAgent};

    try{
        await Url.updateOne(
            {
                short: code
            },
            {
                $push: {analytics: obj}
            }
        );
    }catch(e){
        next(e);
    }

//   browser: { name: 'Chrome', version: '130.0.0.0', major: '130' },
//   engine: { name: 'Blink', version: '130.0.0.0' },
//   os: { name: 'Windows', version: '10' },
//   device: { vendor: undefined, model: undefined, type: undefined },
//   cpu: { architecture: 'amd64' }
}

async function updateCountByOne(code){
    await Url.updateOne(
        {
            short: code
        },
        {
            $inc: {count: 1},
        }
    );
}

function generateCodeFromUrl(shortU){
    const salt = shortU+Date.now();
    const hashids = new Hashids(salt, 4);

    const ran1 = Math.floor(Math.random() * 1000);
    const ran2 = Math.floor(Math.random() * 1000);

    const hash = hashids.encode(ran1,ran2);
    return hash;
}

// async function findExistingUrl(full){
//     const query = {'long': full};

//     return await Url.findOne(query);
// }

async function handleNewUrl(req, res, next){
    try{

        const full = req.body.fullUrl;

        if(!full || !validator.isURL(full, {
            require_host: true, 
            require_tld: true
        })){
            return res.status(400).json({msg: 'Provide a valid URL'});
        }

       // const ans = await findExistingUrl(full);

        // if(ans){
        //     return res.status(201).json({msg: 'success', data: ans.short});
        // }

        //Checking if short is exist or not.
        let hashUrl;
        do{
            hashUrl = generateCodeFromUrl(full);
        }while(await findExistingShort(hashUrl));

        if(req.useremail){
            const urlSchema = {
                short: hashUrl,
                long: full,
                userEmail: req.useremail
            }
    
            const docs = new Url(urlSchema);
            const result = await docs.save();
    
            return res.status(201).json({msg: 'success', data: result.short});    
        }
        const urlSchema = {
            short: hashUrl,
            long: full,
        }

        const docs = new Url(urlSchema);
        const result = await docs.save();

        return res.status(201).json({msg: 'success', data: result.short});
        
        
    }catch(e){
        next(e);
    }
}

async function handleRedirectUrl(req, res, next){
    try{
        const code = req.params.code;

        const query = {'short': code};

        const options = {
            projection: {_id: 0, long: 1}
        }

        const longUrl = await Url.findOne(query, null, options);

        if(longUrl){            
            await updateCountByOne(code);

            const ua = uap(req.headers['user-agent']);
            const ip = req.ip;
            
            await getUserDetail(code, ua, ip);
            
            return res.status(200).json({msg: 'success', data: longUrl.long});
        }

        return res.status(404).json({ msg: 'Code not found' });

    }catch(e){
        next(e);
    }
}

async function handleGetClick(req, res, next){
    try{
        const code = req.params.code;

        const query = {'short': code};

        const options = {
            projection: {_id: 0, count: 1}
        }

        const count = await Url.findOne(query, null, options);
        
        if(count){            
            return res.status(200).json({msg: 'success', data: count.count});
        }

        return res.status(404).json({ msg: 'Code not found' });
    }catch(e){
        next(e);
    }
}

async function handleAnalyticUrl(req, res, next){
    const {code} = req.params;

    const query = {'short': code};

    const options = {
        projection: {
            long: 1,
            count: 1,
            userEmail: 1,
            analytics: 1,
            createdAt: 1,
            lastAccessed: 1
        }
    }

    const data = await Url.findOne(query, null, options);

    if(data){
        return res.status(200).json({msg: 'success', data: data});
    }
    return res.status(404).json({msg: 'Something went wrong'});
}


export {
    handleNewUrl,
    handleRedirectUrl,
    handleGetClick,
    handleAnalyticUrl,
    findExistingShort
}