import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Settings() {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear user data
        localStorage.removeItem('token'); // Clear authentication token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div style={{
            backgroundColor:'#FFC5D3', // Light gray background
            minHeight:'100vh', // Full height of viewport
            padding:'20px'}}>
        <h2 style={{textAlign:'center',marginTop:'20px'}}>Settings</h2>

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'15px'}}>

            {/* <Button 
                variant="primary" 
                onClick={() =>navigate('/payment')} 
                style={{ margin:'10px', width:'200px'}}
            > Payment
            </Button> */}

            <Button 
                variant="success" 
                onClick={() =>navigate('/feedback')} 
                style={{margin:'10px',width:'200px'}}
            >Feedback
            </Button>

            <Button variant="info" onClick={() =>navigate('/appointment')}style={{width:'200px'}}>
                    Book Appointment
                </Button>

            <Button 
                variant="danger" 
                onClick={handleLogout} 
                style={{margin:'10px',width:'200px'}}
            >Logout</Button>
        </div>
        </div>
    );
}

export default Settings;
