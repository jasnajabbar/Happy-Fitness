import {Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
  const [adminData,setAdminData] = useState({
    username:'',
    email:'',
    password:'',
    usertype:'admin',
    createdBy:'system',
    updatedBy:'system'
  });

  const [message,setMessage] =useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleAdminSignup =async(event) => {
    event.preventDefault();
    console.log('Admin Data:',adminData);  

    try {
      const response =await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/myfitness/admin/signup`,
        adminData,  
        {
          withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
      }
        }
      );

      if (response.status ===201) {
        setMessage('Admin registered successfully!');
        setIsError(false);

        setTimeout(() => {
            navigate('/AdminDashboard');
          }, 2000);
      }
    } catch (error) {
        if (error.response?.status ===400) {
            setMessage(error.response.data.error || 'Username already exists. Choose a different one.');
            setIsError(true);
          } else {
            setMessage('An error occurred during signup.');
            setIsError(true);
          }
    }
  };

  return (
    <Form onSubmit={handleAdminSignup}>
      <h3 style={{ textAlign:'center',marginBottom:'20px',marginTop:'20px'}}>Admin Signup</h3>

      <Form.Group className="mb-3" style={{marginLeft:'10px',marginRight:'10px'}}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={adminData.username}
          onChange={(e) => setAdminData({ ...adminData,username: e.target.value})}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{marginLeft:'10px',marginRight:'10px'}}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={adminData.email}
          onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={adminData.password}
          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Form.Label>Usertype</Form.Label>
        <Form.Control placeholder="Admin" disabled />
      </Form.Group>

      <div>
      <Button variant="primary" type="submit" style={{ marginLeft: '10px', marginRight: '10px' }}>
        Signup
      </Button>
      </div>

      {message && (
        <p
          style={{textAlign:'center',color:isError ? 'red' : 'green',
            marginTop: '10px',
          }}
        >
          {message}
        </p>
      )}
    </Form>
  );
}

export default AdminSignup;
