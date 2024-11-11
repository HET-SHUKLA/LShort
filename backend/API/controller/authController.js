import bcrypt from 'bcrypt';
import { salt_round } from '../config';
import { User } from '../models/UserSchema';

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

export {
    handleEmailSignup,
}