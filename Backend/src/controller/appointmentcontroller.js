const Appointment=require('../model/appointmentmodel')

exports.appointment=(async (req, res) => {
  try {
      const { username } = req.params;
      const appointment = await Appointment.findOne({ username });

      if (!appointment) {
          return res.status(404).json({ success: false, message: "No appointment found" });
      }

      res.status(200).json(appointment);
  } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
