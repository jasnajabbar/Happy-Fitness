const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
const Trainer=require('../model/trainermodel')
const  Admin=require('../model/adminmodel')

exports.signupAdmin=async(req,res) => {
    try {
        const {username,email,password,usertype,createdBy,updatedBy,passkey} = req.body;

        if (!username || !email || !password || !passkey) {
            return res.status(400).json({error:"Missing required fields"});
        }
        console.log("Received Passkey:", passkey);
        if (passkey !== process.env.ADMIN_PASS_KEY) {
            return res.status(403).json({error: "Invalid Admin Pass Key"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //adminData (box) where we store all info for new admin
        //adminData collects these values in one place
        //same as username: username,
        // email: email
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
        
        // Create mongoose document
        const newAdmin = new Admin(adminData); 
        //save to mongodb
        await newAdmin.save();

           // Generate JWT token
           const token = jwt.sign(
            { id: newAdmin._id, username: newAdmin.username, usertype: newAdmin.usertype },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );
        res.status(201).json({message: "Admin registered successfully",token,              // <-- return token
            username: newAdmin.username,
            usertype: newAdmin.usertype});
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
            {id:newTrainer._id,username:newTrainer.username},process.env.SECRET_KEY//,{ expiresIn: '1d' } expiry
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
           
              // Validate required fields
            if (!firstname || !username || !usertype || !email || !password || !gender || !height || !weight || !goal || !startweight) {
                return res.status(400).json({ error: 'All required fields must be provided' });
            }

            const allowedUserTpe=['client'];
            if(!allowedUserTpe.includes(usertype)){
                return res.status(400).json({error:"Invalid usert type"});
            }
              // Check if assigned trainer exists
             if (assignedTrainer) {
                 const trainerExists = await Trainer.findOne({username:assignedTrainer});
             if (!trainerExists) {
                 return res.status(400).json({error:"Assigned trainer not found"});
            }
     }

            // Check for duplicate username/email
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
             if (existingUser) {
                return res.status(400).json({ error: "Username or email already exists" });
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
                height:Number(height),
                weight:Number(weight),
                goal,
                startweight:Number(startweight),
                assignedTrainer
            })
            await newUser.save();
            const token=jwt.sign(
                {id:newUser._id,username:newUser.username},process.env.SECRET_KEY,{ expiresIn: '1d'}
            )
            res.cookie('token',token,{httpOnly:true});
            res.status(200).json({message:'User Created Succesfully',token});
        } catch (error) {
            console.error('Error connecting to Mongoose: ', error.message);
            res.status(500).json({error:'Internal Server Error', message: error.message});

        }
    }