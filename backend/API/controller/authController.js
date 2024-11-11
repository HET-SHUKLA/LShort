import bcrypt from 'bcrypt';
import { salt_round } from '../config.js';
import { User } from '../models/UserSchema.js';
import { generateAccessToken } from '../utils/generateAccessToken.js';

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

const handleEmailSignup = async (req, res, next) => {
    try{
        let {email, password} = req.body;

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
                        maxAge: 3600000
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

export {
    handleEmailSignup,
    handleEmailSignin,
}