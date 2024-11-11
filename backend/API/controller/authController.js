import bcrypt from 'bcrypt';
import { salt_round } from '../config';
import { User } from '../models/UserSchema';

const updateLastAccessedForUser = (e) => {
    User.updateOne(
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
    
            const docs = new User(schema);
            const result = await docs.save();

            return res.status(201).json({msg: 'success', data: result});
        });
        
    }catch(e){
        next(e);
    }
}

const handleEmailSignin = async (req, res, next) => {
    const {email, password} = req.body;
    
    const query = {'email': email};

    const options = {
        projection: {_id: 0, password: 1}
    }

    const hash = await User.findOne(query, null, options);    
    if(hash){
        bcrypt.compare(password, hash.password, function(err, result) {
            if(err){
                next(err);
                return;
            }

            if(result){

                //Not async await, because it can run in the background
                updateLastAccessedForUser(email);

                res.status(200).json({msg: 'success'});
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