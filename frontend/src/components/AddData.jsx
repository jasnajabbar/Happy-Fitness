import  {useState} from 'react';
import {Button,Form} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';

function AdminPanel() {
  const [selectedForm,setSelectedForm] = useState('trainer');
  const [trainerData,setTrainerData] = useState({
    trainername:'',
    username:'',
    email: '',
    password:'',
    usertype:'trainer',
    assignedClient:'',
  });

  const [clientData, setClientData] = useState({
    firstname:'',
    username:'',
    email:'',
    password:'',
    gender:'',
    age:'',
    height:'',
    weight:'',
    goal:'',
    startweight:'',
    assignedTrainer:'',
    usertype:'client'
  });

  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""),3000);
      return () =>clearTimeout(timer);
    }
  },[success]);

  //Handle form submission for adding a trainer
  const handleAddTrainer =async(event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin token missing. Please login again.');
      return;
    }

    try {
      const response =await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/admin/addtrainer`.replace(/([^:]\/)\/+/g, "$1"),trainerData, {
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
      },
      });

      if (response.status===201|| response.status === 200) {
        setSuccess(response.data.message);
        setTrainerData({trainername:'',username:'',email:'',password:'',assignedClient:'',usertype:'trainer'});
      }
      alert("Trainer Created Successfully!");
    } catch (err) {
      setError(err.response ?err.response.data.message :'Error adding trainer');
    }
  };

  // Handle form submission for adding a client
  const handleAddClient = async(event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin token missing. Please login again.');
      return;
    }
    
    try {
        const response=await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/admin/adduser`,
         { ...clientData, usertype: 'client' },{ // explicitly add usertype
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
      }
      });

      if (response.status===201 || response.status === 200) {
        setSuccess(response.data.message); // Display success message
        setClientData({
            firstname:'',
            username:'',
            email:'',
            password:'',
            gender:'',
            age:'',
            height:'',
            weight:'',
            goal:'',
            startweight:'',
            assignedTrainer:'',
            usertype:'client'
        }); // Clear form
      }
      alert("Client Created Successfully!");
    } catch (err) {
      setError(err.response ?err.response.data.message:'Error adding client');
    }
  };

  return (
    <div className="admin-dashboard-container">

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Radio Button Selection */}
      <div className="radio-buttons" style={{marginBottom:'25px',marginLeft:"10px"}}>
        <Form.Check
          type="radio"
          label="Add Trainer"
          name="userType"
          value="trainer"
          checked={selectedForm ==='trainer'}
          onChange={(e) => setSelectedForm(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="Add Client"
          name="userType"
          value="client"
          checked={selectedForm ==='client'}
          onChange={(e) => setSelectedForm(e.target.value)}
        />
      </div>

      {/* Form for Adding a Trainer */}
      {selectedForm === 'trainer' && (
        <Form onSubmit={handleAddTrainer}>
          <h3 style={{textAlign:"center",marginBottom:'20px',marginTop:"20px"}}>Add Trainer</h3>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={trainerData.trainername}
              onChange={(e) => setTrainerData({ ...trainerData,trainername: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={trainerData.username}
              onChange={(e) => setTrainerData({ ...trainerData, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={trainerData.email}
              onChange={(e) => setTrainerData({ ...trainerData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={trainerData.password}
              onChange={(e) => setTrainerData({ ...trainerData, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
        <Form.Label>Usertype</Form.Label>
        <Form.Control placeholder="Trainer" disabled />
      </Form.Group>

        <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Assigned Client</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assigned client"
              value={trainerData.assignedClient}
              onChange={(e) =>setTrainerData({ ...trainerData,assignedClient: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{marginLeft:"10px",marginRight:"10px"}}>
            Add Trainer
          </Button>
        </Form>
      )}

      {/* Form for Adding a Client */}
      {selectedForm === 'client' && (
        <Form onSubmit={handleAddClient}>
          <h3 style={{textAlign:"center",marginBottom:'20px',marginTop:"20px"}}>Add Client</h3>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              value={clientData.firstname}
              onChange={(e) => setClientData({ ...clientData, firstname: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={clientData.username}
              onChange={(e) => setClientData({ ...clientData, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label>Usertype</Form.Label>
          <Form.Control placeholder="Client" disabled />
        </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={clientData.email}
              onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={clientData.password}
              onChange={(e) => setClientData({ ...clientData, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label htmlFor="disabledSelect">Gender</Form.Label>
          <Form.Select
            id="gender"
            placeholder="Enter gender"
            value={clientData.gender}
            onChange={(e) =>setClientData({ ...clientData, gender:e.target.value})}>
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter age"
              value={clientData.age}
              onChange={(e) =>setClientData({ ...clientData,age: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter height"
              value={clientData.height}
              onChange={(e) =>setClientData({ ...clientData,height: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter weight"
              value={clientData.weight}
              onChange={(e) =>setClientData({ ...clientData,weight: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ marginLeft: "10px", marginRight: "10px" }}>
            <Form.Label>Goal</Form.Label>
            <Form.Select
              value={clientData.goal}
              onChange={(e) => setClientData({ ...clientData, goal: e.target.value })}
            >
              <option value="">Select Goal</option>
              <option value="Weight Loss">weight gain</option>
              <option value="Weight Gain">weight loss</option>
              <option value="Muscle Building">maintain weight</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Start Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter start weight"
              value={clientData.startweight}
              onChange={(e) =>setClientData({ ...clientData,startweight: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Assigned Trainer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assigned Trainer"
              value={clientData.assignedTrainer}
              onChange={(e) =>setClientData({ ...clientData,assignedTrainer: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{marginLeft:"10px",marginRight:"10px"}}>
            Add Client
          </Button>
        </Form>
      )}
    </div>
  );
}

export default AdminPanel;
