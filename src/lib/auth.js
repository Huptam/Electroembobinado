module.exports={
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    },

    isNotLoggedin(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/motores');
    }
}