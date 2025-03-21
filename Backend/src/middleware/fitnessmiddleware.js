const jwt=require('jsonwebtoken');

//middleware
const authUser=(req,res,next)=>{
    console.log('Auth middleware triggered');
    const token=req.cookies.token || req.headers['authorization']?.split(' ')[1];//cookie-parser adds a cookies object to req,token to be in the format Bearer <token>
    console.log(token);

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    try {
        const verified=jwt.verify(token,process.env.SECRET_KEY)//valid user info will get in verified
        req.user=verified; 
        next();
    } catch (error) {
        res.status(403).json({message:'Invalid Token'})
    }
}
module.exports={authUser};