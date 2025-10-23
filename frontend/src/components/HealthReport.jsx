import axios from 'axios';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

function HeathReport() {

    const navigate=useNavigate();
    const [formData,setFormData]=useState({username:'',healthissue:''})
    const [message,setMessage] = useState('');

    useEffect(() => {
        const storedUsername =localStorage.getItem('username');
        if (storedUsername) {
            setFormData(prevState => ({
                ...prevState,
                username: storedUsername
            }));
        } else {
            setMessage('Username not found. Please log in again.');
        }
    }, []);

    //handle input change
    const handleChange=(e)=>{
        const {name,value} =e.target; //
        setFormData(prevState => ({
            ...prevState,
            [name]:value //ensure name is used
        }));
    }
    const handleSubmit =async(e) => {
        e.preventDefault();

        console.log("Submitting data:",formData); // Check what is being sent

    if (!formData.username || !formData.healthissue) {
        setMessage("Fields are required!");
        return;
    }
    try {
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/healthreport`.replace(/([^:]\/)\/+/g, "$1"),formData,{withCredentials:true})
        

        if(response.status===200){
            setMessage(response.data.message);

            const token = response.data.token; //get token
            localStorage.setItem('token', response.data.token);
            
            const userResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/myfitness/user/${formData.username}`.replace(/([^:]\/)\/+/g, "$1"),
            {headers: {
                      Authorization: `Bearer ${token}`

            },
                withCredentials:true});
            const userGoal=userResponse.data.goal ? userResponse.data.goal.toLowerCase() : '';

            if (userGoal ==="weight gain") {
                navigate("/weightGainExercises");
            } else if (userGoal ==="weight loss") {
                navigate("/weightLossExercises");
            } else {
                navigate("/weightMaintainExercises");
            }
        }
    } catch (error) {
        console.error('Error submitting health report:',error);
        setMessage('Failed to submit health report.');
    }
}
  return (
    <div style={{
        backgroundColor: '#FFC5D3',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
    <Form onSubmit={handleSubmit}>
    <h3 style={{textAlign:'center',paddingTop:'20px'}}>Health Record</h3>


      <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
        <Form.Label>Health Issue</Form.Label>
        <Form.Control type="text" name="healthissue" placeholder="Enter Health Issues" value={formData.healthissue} 
        onChange={handleChange} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" style={{marginLeft:"10px"}}>
        Submit
      </Button>
      {message && <p style={{marginTop:"10px",color:"green"}}>{message}</p>}
    </Form>
    </div>
  );
}

export default HeathReport;