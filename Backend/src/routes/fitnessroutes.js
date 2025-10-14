const express=require('express');
const {createUser,loginUser,getUser,logoutUser}=require('../controller/authcontroller')
const {updateUser,updateTrainer}=require('../controller/updatecontroller')
const {addTrainer,addUser,signupAdmin}=require('../controller/admincontroller')
const {listAllUser,listAllTrainer}=require('../controller/listcontroller')
const {deleteUser,deleteTrainer}=require('../controller/deletecontroller')
const {weightLog,setGoals,updateGoals,weightProgress,weightHistory,weightAnalysis}=require('../controller/weightcontroller');
const router=express.Router(); // Initialize the router
const {userFeedback}=require('../controller/feedbackcontroller')
const {authUser}=require('../middleware/fitnessmiddleware')
const {authAdmin}=require('../middleware/adminMiddleware')
const {userReport,getUserReport}=require('../controller/healthReportController')
const {getAllTrainers}=require('../controller/trainerController');
const {bookAppointment,getAppointmentByUsername,getAllAppointments,updateAppointmentStatus}=require("../controller/appointmentcontroller");


router.post('/signup',createUser);//
router.post('/login',loginUser);//
router.get('/user/:username',authUser,getUser); //
router.get('/logout',logoutUser);//
router.post('/admin/signup',authAdmin,signupAdmin);//

//admin
router.post('/admin/addtrainer',authAdmin,addTrainer);//
router.post('/admin/adduser',authAdmin,addUser);//

//update
router.put('/user/:username',authUser,updateUser) //
router.put('/trainer/:id',authUser,updateTrainer) //

//listing
router.get('/users',listAllUser);//
router.get('/trainers',listAllTrainer);//

router.delete('/user/:username',authUser,deleteUser)
router.delete('/trainer/:username',authUser,deleteTrainer)


router.post('/weightlog',weightLog); //daily weight
router.post('/setgoals',setGoals);
router.put('/weightgoals/:username',updateGoals) //update goal
router.get('/weightprogress/:username',weightProgress);
router.get('/weighthistory/:username',weightHistory); //fetch all weight
router.get('/weightanalysis/:username',weightAnalysis);
// router.put('/assigntrainer',assignTrainer);
// router.post('/payment',authUser,payment)
// router.post('/ackpayment',authUser,ackPayment);
router.post("/bookappointment", bookAppointment);
router.get("/appointments/:username", getAppointmentByUsername);
router.get("/getappointments", getAllAppointments);
router.put("/updateappointment", updateAppointmentStatus);
router.post('/healthreport',userReport);
router.get("/healthreport/:username", getUserReport);
router.get('/gettrainers', getAllTrainers);

router.post('/feedback',userFeedback)

module.exports=router;