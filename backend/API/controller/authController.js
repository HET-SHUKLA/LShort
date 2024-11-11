import bcrypt from 'bcrypt';

const handleEmailSignup = async (req, res, next) => {
    try{
        let {email, pass} = req.body;

        bcrypt.hash(pass, parseInt(SALT_ROUND), async (err, hash) => {
            if(err){
                next(err);
                return;
            }
            const schema = {
                email: email,
                password: hash
            }
    
            const docs = new Email(schema);
            const result = await docs.save();

            return res.status(201).json({msg: 'success', data: result});
        });
        
    }catch(e){
        next(e);
    }
}