import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/Login';
import WelcomePage from './components/Welcome';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PersonalDetails from './components/Details';
import BMICalculator from './components/Bmi';
import DailyWeight from './components/weightlog';
import WeightReport from './components/Reports';
import AddTrainer from './components/Trainer';
import { useLocation } from 'react-router-dom';
import AdminSignup from './components/AdminSignup';
import HeathReport from './components/HealthReport';
import WeightMaintainExercise from './components/WeightMaintain';
import WeightGainExercise from './components/WeightGain';
import WeightLossExercise from './components/WeightLoss';
import Dashboard from './components/Dashboard';
import TrainerDashboard from './components/Trainer';
import AdminDashboard from './components/Admin';
import AdminPanel from './components/AddData';
import ReportPage from './components/UserReport';
import Settings from './components/Settings';
import FeedbackPage from './components/FeedbackPage';
import BookAppointment from './components/Appointments';
import TrainerAppointments from './components/TrainerAppointment';
import.meta.env.VITE_SERVER_URL



function App() {
  return (
    <Router>
      {/* Main Content of the Homepage */}
      <Routes>
        <Route path="/" element={
            <div
              style={{
                backgroundColor: '#FFC5D3',
                minHeight: '100vh',
                textAlign: 'center',
                position: 'relative',
                paddingTop: '25px',
              }}
            >
              <Link to="/login">
                <Button
                  type="button"
                  className="btn btn-light"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    borderRadius: '50px',
                    padding: '5px 10px',
                  }}
                >
                  Login
                </Button>
              </Link>
              <h1 className="mb-4 mt-3 text-white">Happy Fitness</h1>

              <div className="row">
                <div className="col-12 col-lg-6 order-1 order-lg-0">
                  <h3 className="mb-4">#nutrition tracking</h3>
                  <h1 className="mb-4">Nutrition track the easy way, for real life.</h1>
                  <p>Track your food, exercise, and calories effortlessly—all in one place!</p>
                </div>

                {/* Image Section */}
                <div className="col-12 col-lg-6 order-0 order-lg-1">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJFTI88_ayOZIzJBEe_r9UfjMlQ--0VxKtgVEaiW1kAsJkCFs0s48Uqf9D7lBKFTwM_g&usqp=CAU"
                    className="img-fluid rounded"
                    alt="Placeholder"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/welcomePage">
                  <button type="button" className="btn btn-light w-25">
                    Start Now
                  </button>
                </Link>
              </div>
              <div style={{marginTop:'20px'}}>
              <Link to="/signup?type=admin" style={{color:'black'}}>Admin Signup</Link>
              </div>      
              </div>
          }
        />

        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Welcome Page Route */}
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/details" element={<PersonalDetails/>}/>
        <Route path="/bmi" element={<BMICalculator/>}/>
        <Route path="/weightlog" element={<DailyWeight/>}/>
        <Route path='/reports' element={<WeightReport/>}/>
        <Route path='/healthReport' element={<HeathReport/>}/>
        <Route path='/weightMaintainExercises' element={<WeightMaintainExercise/>}/>
        <Route path='/weightGainExercises' element={<WeightGainExercise/>}/>
        <Route path='/weightLossExercises' element={<WeightLossExercise/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/trainerDashboard' element={<TrainerDashboard/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
        <Route path='/reportpage' element={<ReportPage/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path='/appointment' element={<BookAppointment/>}/>
        <Route path='/getappointments' element={<TrainerAppointments/>}/>

        <Route path="/signup" element={<SignupHandler />} />
      </Routes>
    </Router>
  );
}

function SignupHandler() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  return type === 'trainer' ? <AddTrainer /> : <AdminSignup/>;
}

export default App;
