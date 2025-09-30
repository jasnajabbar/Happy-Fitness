const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const  Admin=require('../model/adminmodel')

exports.signupAdmin=async(req,res) => {
    try {
        const {username,email,password,usertype,createdBy,updatedBy} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error:"Missing required fields"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const adminData ={
            username,
            email,
            password:hashedPassword,
            usertype: usertype||"admin"
        };
        if (usertype ==='admin') {
            if (!createdBy || !updatedBy) {
                return res.status(400).json({ error:'Both createdBy and updatedBy are required for admins'});
            }

            adminData.createdBy =createdBy;
            adminData.updatedBy =updatedBy;
        }
        
        // Create a new admin instance
        const newAdmin = new Admin(adminData);

        await newAdmin.save();
        res.status(201).json({message: "Admin registered successfully"});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error" ,message:error.message});
    }
};

exports.addTrainer=async(req,res)=>{
    try {
        const{username,email,password,assignedClient,usertype}=req.body;

        const allowedUserTpe=['trainer'];
        if(!allowedUserTpe.includes(usertype)){
            return res.status(400).json({error: "Invalid user type"})
        }

        const client = await User.findOne({username:assignedClient});
        if (!client) {
            return res.status(400).json({ error: "Client not found"});
        }

        const hashpassword=await bcrypt.hash(password,10); //await only in async function
        const newTrainer=new Trainer({
            username,
            email,
            password:hashpassword,
            assignedClient:client.username,
            usertype
        })
        await newTrainer.save();
        const token=jwt.sign(
            {id:newTrainer._id,username:newTrainer.username},process.env.SECRET_KEY
        )
        res.cookie('token',token,{httpOnly:true});
        res.json({message:'Trainer Created Successfully',token})
    } catch (error) {
        console.error('Error connecting to Mongoose: ', error.message);
    }
}

    exports.addUser=async(req,res)=>{
        try {
            const {firstname,username,usertype,email,password,gender,age,height,weight,goal,startweight,assignedTrainer}=req.body;
            const allowedUserTpe=['client'];
            if(!allowedUserTpe.includes(usertype)){
                return res.status(400).json({error:"Invalid usert type"});
            }
            const hashpassword=await bcrypt.hash(password,10);
            const newUser=new User({
                firstname,
                username,
                usertype,
                email,
                password:hashpassword,
                gender,
                age,
                height,
                weight,
                goal,
                startweight,
                assignedTrainer
            })
            await newUser.save();
            const token=jwt.sign(
                {id:newUser._id,username:newUser.username},process.env.SECRET_KEY
            )
            res.cookie('token',token,{httpOnly:true});
            res.status(200).json({message:'User Created Succesfully',token});
        } catch (error) {
            console.error('Error connecting to Mongoose: ', error.message);
        }
    }