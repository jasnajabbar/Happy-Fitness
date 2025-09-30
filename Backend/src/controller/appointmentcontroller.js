const Appointment = require('../model/appointmentmodel');

exports.bookAppointment = async (req,res) => {
    try {
      const {username,trainerName,date,slot} = req.body;
  
      if (!username || !trainerName || !date || !slot) {
        return res.status(400).json({message: "All fields are required"});
      }
  
      // Check if user already has an appointment
      const existing = await Appointment.findOne({username});
      if (existing) {
        return res.status(400).json({message: "You already have an appointment booked"});
      }
  
      const appointment = new Appointment({
        username,
        trainerName,
        date,
        slot,
        status: "Pending",
      });
  
      await appointment.save();
  
      res.status(201).json({message:"Appointment booked successfully"});
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ message:"Internal server error"});
    }
  };
  
  exports.getAppointmentByUsername = async (req,res) => {
  try {
    const {username} = req.params;

    if (!username) {
      return res.status(400).json({success:false,message:"Username is required"});
    }
    const appointment = await Appointment.findOne({username});

    if (!appointment) {
      return res.status(404).json({success:false,message:"No appointment found"});
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

exports.getAllAppointments = async(req,res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({message:"Internal server error"});
    }
  };

exports.updateAppointmentStatus = async(req,res) => {
    try {
      const {username,status} =req.body;
  
      if (!username || !status) {
        return res.status(400).json({message:"Username and status are required"});
      }
  
      const appointment =await Appointment.findOne({username});
  
      if (!appointment) {
        return res.status(404).json({message:"Appointment not found"});
      }
  
      appointment.status=status;
      await appointment.save();
  
      res.status(200).json({message:`Appointment ${status} successfully`,appointment});
    } catch (error) {
      console.error("Error updating appointment:",error);
      res.status(500).json({message: "Internal server error"});
    }
  };
  