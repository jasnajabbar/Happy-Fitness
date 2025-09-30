// const Report = require('../model/reportsmodel');
// const { User } = require('../model/usermodel');

// // Function to create a health report
// const userReport = async (req, res) => {
//     try {
//         const { username, healthissue } = req.body;

//         if (!username || !healthissue) {
//             return res.status(400).json({ message: "Fields are required" });
//         }

//         // Check if user exists
//         const userExists = await User.findOne({ username });
//         if (!userExists) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Save the report
//         const newReport = new Report({
//             username,
//             healthissue
//         });

//         await newReport.save();

//         res.status(200).json({
//             message: "Health report submitted successfully",
//             token: req.cookies.token || ""
//         });
//     } catch (error) {
//         console.error("Error adding health report:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Function to get a health report for a username
// const getUserReport = async (req, res) => {
//     try {
//         const { username } = req.params;

//         if (!username) {
//             return res.status(400).json({ message: "Username is required" });
//         }

//         const report = await Report.findOne({ username });

//         if (!report) {
//             return res.status(404).json({ message: "Report not found" });
//         }

//         res.status(200).json(report);
//     } catch (error) {
//         console.error("Error fetching report:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // ✅ Proper export of both functions
// module.exports = { userReport, getUserReport };


const Report = require('../model/reportsmodel');
const { User } = require('../model/usermodel');

// Create a health report
const userReport = async(req,res) => {
    try {
        const {username,healthissue} =req.body;

        if (!username || !healthissue) {
            return res.status(400).json({message:"Fields are required"});
        }

        const userExists =await User.findOne({username});
        if (!userExists) {
            return res.status(404).json({message:"User not found"});
        }

        const newReport =new Report({
            username,
            healthissue
        });

        await newReport.save();

        res.status(200).json({
            message:"Health report submitted successfully"
        });
    } catch (error) {
        console.error("Error adding health report:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

const getUserReport=async(req,res) => {
  try {
      const {username} =req.params;

      if (!username) {
          return res.status(400).json({message:"Username is required"});
      }

      const user=await User.findOne({username},"weight goal height");
      if (!user) {
          return res.status(404).json({message:"User not found"});
      }

      const report=await Report.findOne({username},"healthissue");

      const bmi=user.weight && user.height
          ? (user.weight / ((user.height/100)**2)).toFixed(2)
          : "Not set";

      res.status(200).json({
          username:username || "Not set",
          weight:user.weight !== undefined ? user.weight:"Not set",
          goal:user.goal || "Not set",
          BMI:bmi,
          healthissue:report?.healthissue || "Not set"
      });
  } catch (error) {
      console.error("Error fetching report:",error);
      res.status(500).json({message:"Internal server error"});
  }
};

module.exports={userReport,getUserReport};
