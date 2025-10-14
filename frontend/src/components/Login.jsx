import {useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [usertype,setUsertype]=useState('admin'); //first option
  const [error,setError]=useState('');
  const navigate=useNavigate();
  

  const handleSubmit=async(event) => {
    event.preventDefault();

    const loginData={
      email,
      password,
      usertype: usertype.toLowerCase() // force lowercase before sending to backend
    };
      console.log(loginData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/login`, 
        loginData,
      {
        withCredentials:true,
        headers: {
          'Content-Type':'application/json',
      }
      });

      console.log("Response from backend:",response.data);

      if (response.data.message==="Login Successfull") {
        alert('Login Successful');

        localStorage.setItem('username',response.data.username); 
        localStorage.setItem('usertype',response.data.usertype); 
        localStorage.setItem('token', response.data.token); 

        console.log('Stored in localStorage:', {
            username: localStorage.getItem('username'),
            usertype: localStorage.getItem('usertype'),
            token: localStorage.getItem('token'), 
          });

          
        const usertype=response.data.usertype;
        console.log('Navigating to:',usertype==='client' ? '/bmi' : `/${usertype}Dashboard`);
        
        setTimeout(() => {
            if (usertype==='client') {
                navigate('/dashboard');
            } else {
                navigate(`/${usertype}Dashboard`);
            }
        }, 500);
    }
    } catch (err) {
        console.error(err);
        setError('User not found',err);    
    }
  };

  return (
    <div className="login-container" style={
        {backgroundImage:`url(https://i.pinimg.com/736x/e1/c0/8b/e1c08b1e5a00a21a10da9c5c2587c430.jpg)`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            minHeight:"100vh", // Ensures it covers the full screen
            width:"100%",
        }}>
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <h2 style={{textAlign:"center",marginBottom:"20px",color:"black"}}>Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label htmlFor="disabledSelect">Select Usertype</Form.Label>
          <Form.Select
            id="usertype"
            value={usertype}
            onChange={(e) =>setUsertype(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
            <option value="client">Client</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginLeft:"10px",marginRight:"10px"}}>
          Submit
        </Button>

        
      </Form>
    </div>
  );
}

export default LoginPage;
