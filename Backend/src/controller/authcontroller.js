const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const Admin=require('../model/adminmodel')


//createuser
exports.createUser=async(req,res)=>{
    console.log('data check');
    try {
        const{firstname,username,email,password,usertype,startweight,goal,weight,height,gender}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new User({
            firstname,
            username,
            email,
            password:hashedpassword,
            usertype,
            startweight,
            goal,
            weight,
            height,
            gender,
        })
        await newUser.save(); //on save it is insert in db

        const token=jwt.sign(
            {id:newUser._id,username:newUser.username},process.env.SECRET_KEY
        )
        //to keep token in cookie, cookie will be in response obj
        res.cookie('token',token,{httpOnly:true})
        res.status(201).json({message:'User Created Successfully',token})
    }
     catch (error) {
        console.error('Error connecting to Mongoose: ',error.message)     
    }
}

//login user
exports.loginUser = async(req,res) => {
    try {
        console.log("Login request body:", req.body);

        const {email,password,usertype} = req.body;
        const normalizedUsertype =usertype.trim().toLowerCase();

        console.log("Normalized usertype:", normalizedUsertype);

        let user;
        if (normalizedUsertype === 'admin') {
            user=await Admin.findOne({email});
        } else if (normalizedUsertype === 'trainer') {
            user=await Trainer.findOne({email});
        } else {
            user=await User.findOne({email});
        }

        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({message:'Invalid Email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:'Invalid Password'});
        }

        if (user.usertype.toLowerCase() !== normalizedUsertype) {
            return res.status(403).json({message:'Unauthorized Access'});
        }

        const token = jwt.sign(
            {id: user._id, username: user.username, usertype: user.usertype},
            process.env.SECRET_KEY
        );

        res.cookie('token',token,{httpOnly: true});

        return res.json({
            message:'Login Successfull',
            token,
            username:user.username,
            usertype:user.usertype
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({message:error.message});
    }
};

  
//get user
exports.getUser=async(req,res)=>{
    try{
        const user=await User.find();
        res.status(200).json(user);
    }   
    catch(error){
        console.error('Error fetching customers:',error.message);
        res.status(500).json({message:'Error fetching customers',error:error.message});
    }
}
//logout
exports.logoutUser=(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message:'Logout Successful'});
    } catch (error) {
        res.status(500).json({message:'Something went wrong',error:error.message})
    }
}