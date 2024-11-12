const handleUserGet = (req, res) => {
    if(req.useremail){
        res.status(200).json({msg: 'success', data: req.useremail});
        return;
    }
    res.status(302).json({msg: 'token not found, redirects to the login page'});
}

export{
    handleUserGet
}