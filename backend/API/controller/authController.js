import bcrypt from 'bcrypt';
import {
    salt_round,
    client_id,
    client_secret,
    redirect_url
} from '../config.js';
import { User } from '../models/UserSchema.js';
import { generateAccessToken } from '../utils/generateAccessToken.js';
import axios from 'axios';

const updateLastAccessedForUser = async (e) => {
    await User.updateOne(
        {
            email: e
        },
        {
            $set: {lastAccessed: Date.now()}
        }
    );
}

const checkIfUserExists = async (e, type) => {
    const query = {'email': e, 'account': type};

    const result = await User.findOne(query);

    if(result){
        return true;
    }
    return false;
}

const handleEmailSignup = async (req, res, next) => {
    try{
        let {email, password} = req.body;

        if(checkIfUserExists(email, 'email')){
            res.status(400).json({msg: 'User is already exists, kindly login'});
            return;
        }

        bcrypt.hash(password, parseInt(salt_round), async (err, hash) => {
            if(err){
                next(err);
                return;
            }
            const schema = {
                email: email,
                password: hash
            }
            
            try{
                const docs = new User(schema);
                const result = await docs.save();
                return res.status(201).json({msg: 'success', data: result});
            }catch(e){
                next(e);
                return;
            }
        });
        
    }catch(e){
        next(e);
    }
}

const handleEmailSignin = async (req, res, next) => {
    const {email, password} = req.body;
    const {remember} = req.body || 'false';

    const query = {'email': email};

    const options = {
        projection: {_id: 0, password: 1}
    }

    const hash = await User.findOne(query, null, options);    
    if(hash){
        bcrypt.compare(password, hash.password, async function(err, result) {
            if(err){
                next(err);
                return;
            }

            if(result){

                await updateLastAccessedForUser(email);

                const token = await generateAccessToken(email, remember);

                if(token){
                    res.cookie('token', token, {
                        httpOnly: true, 
                        secure: true,
                        maxAge: remember ? 604800000 : 3600000,
                    });

                    res.status(200).json({msg: 'success', data: token});
                }else{
                    res.status(500).json({msg: 'Internal Server Error'});
                }
                return;
            }
            
            res.status(401).json({msg: 'Password is wrong'})
        });
    }else{
        res.status(404).json({msg: 'User does not exists'});
    }
}

const handleGoogleAuth = async (req, res, next) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=profile email`;
    res.redirect(url);
}

const handleGoogleRedirect = async (req, res, next) => {
    const {code} = req.query;
    
    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_url,
            grant_type: 'authorization_code'
        });
        const accessToken = tokenResponse.data.access_token;        

        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const profile = profileResponse.data || false;
        
        if(profile && checkIfUserExists(profile.email, 'google')){
            await updateLastAccessedForUser(email);
            const remember = 'true';
            
            const token = await generateAccessToken(email, remember);

            if(token){
                res.cookie('token', token, {
                    httpOnly: true, 
                    secure: true,
                    maxAge: remember ? 604800000 : 3600000,
                });

                res.status(200).json({msg: 'success', data: token});
            }else{
                res.status(500).json({msg: 'Internal Server Error'});
            }
            return;
        }

        if(profile){
            const userSchema = {
                email: profile.email,
                account: 'google',
            };
            
            const docs = new User(userSchema);
            await docs.save();

            const remember = 'true';
            
            const token = await generateAccessToken(email, remember);

            if(token){
                res.cookie('token', token, {
                    httpOnly: true, 
                    secure: true,
                    maxAge: remember ? 604800000 : 3600000,
                });

                res.status(201).json({msg: 'success', data: token});
            }else{
                res.status(500).json({msg: 'Internal Server Error'});
            }
            return;
        }

        res.status(401).json({msg: 'Something went wrong'});
    } catch (error) {
        next(error);
    }
}

export {
    handleEmailSignup,
    handleEmailSignin,
    handleGoogleAuth,
    handleGoogleRedirect
}