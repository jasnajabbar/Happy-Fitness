const express=require('express');
const {createUser,loginUser,getUser,logoutUser}=require('../controller/authcontroller')
const {updateUser,updateTrainer}=require('../controller/updatecontroller')
const {addTrainer,addUser,signupAdmin}=require('../controller/admincontroller')
const {listAllUser,listAllTrainer}=require('../controller/listcontroller')
const {deleteUser,deleteTrainer}=require('../controller/deletecontroller')
const {weightLog,setGoals,updateGoals,weightProgress,weightHistory,weightAnalysis}=require('../controller/weightcontroller');
const router=express.Router(); // Initialize the router
const {authUser}=require('../middleware/fitnessmiddleware')


router.post('/signup',createUser);//
router.post('/login',loginUser);//
router.get('/user/:username',authUser,getUser); //
router.get('/logout',logoutUser);//
router.post('/admin/signup',signupAdmin);//

//admin
router.post('/admin/addtrainer',authUser,addTrainer);//
router.post('/admin/adduser',authUser,addUser);//

//update
router.put('/user/:username',authUser,updateUser) //
router.put('/trainer/:id',authUser,updateTrainer) //

//listing
router.get('/users',listAllUser);//
router.get('/trainers',listAllTrainer);//

router.delete('/user/:username',authUser,deleteUser)
router.delete('/trainer/:username',authUser,deleteTrainer)

// router.post('/upload-profile-pic',authUser,upload.single("profileImage"),uploadProfileImage);
// router.get('/viewprofile',authUser,viewProfile);
// router.get('/updateprofile',authUser,updateProfile);

router.post('/weightlog',weightLog); //daily weight
router.post('/setgoals',setGoals);
router.put('/weightgoals/:username',updateGoals) //update goal
router.get('/weightprogress/:username',weightProgress);
router.get('/weighthistory/:username',weightHistory); //fetch all weight
router.get('/weightanalysis/:username',weightAnalysis);
// router.put('/assigntrainer',assignTrainer);
// router.post('/payment',authUser,payment)
// router.post('/ackpayment',authUser,ackPayment);

module.exports=router;