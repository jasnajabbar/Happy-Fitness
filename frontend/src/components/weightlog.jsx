import axios from 'axios';
import { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function DailyWeight(){
    const [username,setUsername]=useState('');
    const [weight,setWeight]=useState('');
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');

    const navigate = useNavigate();

        useEffect(() => {
            const storedUsername =localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            } else {
                setError('Username not found. Please log in again.');
            }
        }, []);

        const handleSubmit=async(e)=> {
            e.preventDefault();
    
            if (!username) {
                setError('Username not found. Please log in.');
                return;
            }

        try {
          // 
          //${import.meta.env.VITE_SERVER_URL}/myfitness/weightlog,.replace(/([^:]\/)\/+/g, "$1")
            const response=await axios.post("https://happy-fitness-frontend.onrender.com/login}",{
                username:username.trim(),
                weight:parseFloat(weight),
            },
                {
                  withCredentials:true,
                  headers: {
                    'Content-Type': 'application/json',
                }
                } 
            );
            console.log("Response from API:", response.data);

            if (response.data?.success) {
                setMessage('Weight logged successfully!');
                setWeight('');

                localStorage.setItem("username", username.trim());
                console.log('Navigating to reports...');
                navigate("/reports", { state: { refresh: true } }); 
              }
        } catch (err) {
            console.error('Failed to log weight:',err);
            setError(err.response?.data?.message);
        }

        //cear message before nav
        setTimeout(() => {
            setMessage('');
            setError('');
          }, 3000);
    }

  return (
    
    <Form onSubmit={handleSubmit} style={{textAlign:"center",backgroundColor:'#FFDE21',backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures it covers the full screen
        width: "100%",}}>
          <h2 style={{textAlign:"center",marginBottom:"20px",marginTop:"10px"}}>Daily Weight</h2>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

      <Form.Group className="mb-3  d-flex flex-column align-items-center" controlId="formGroupEmail" style={{marginLeft:"10px",marginRight:"10px"}}>
        <Form.Label>Weight</Form.Label>
        <Form.Control type="text" placeholder="Enter Weight" 
        value={weight}  
        onChange={(e) => setWeight(e.target.value)} style={{width:"50%",textAlign:"center"}}/>
      </Form.Group>

      <Button variant="primary" type="submit" style={{marginLeft:"10px"}}>Submit</Button>
    {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
    </Form>
  );
}

export default DailyWeight;