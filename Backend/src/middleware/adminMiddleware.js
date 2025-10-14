const {authUser} =require('../middleware/fitnessmiddleware'); // import general middleware

const authAdmin =(req,res, next) => {
  authUser(req,res,() => { // first verify token
    if (req.user.usertype !== 'admin') {
      return res.status(403).json({message:'Forbidden: Admins only'});
    }
    next(); // admin verified
  });
};

module.exports ={authAdmin};
