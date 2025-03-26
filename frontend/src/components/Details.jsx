import  {useState} from 'react';
import {Button,Form,Row,Col,Image} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function PersonalDetails() {

    const navigate = useNavigate();
 
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

    // Handle gender selection
    const handleGenderSelect = (selectedGender) => {
      setClientData((prevData) => {
        const updatedData = { ...prevData, gender: selectedGender };
        console.log("Updated Gender:", updatedData.gender); // Debugging
        return updatedData;
      });
    };
  // Handle form submission for adding a client
  const handleAddClient = async(event) => {
    event.preventDefault();

    for (const key in clientData) {
      if (typeof clientData[key] === 'string' && clientData[key].trim() === '') {
        setError(`Please fill out all fields.`);
        console.log(`Missing field: ${key}`); // Debugging
        return;
      }
    }

    setError('');
    console.log("Submitting Data:", clientData);

    try {
      const response=await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/signup`.replace(/([^:]\/)\/+/g, "$1"),clientData,{
        withCredentials: true,
      });

      if (response.status===201 || response.status === 200) {
        setSuccess(response.data.message); // Display success message

        localStorage.setItem("username", clientData.username);
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
            usertype:'client'
        }); // Clear form
        navigate('/bmi');


      }
    } catch (err) {
      setError(err.response ?err.response.data.message:'Error adding client');
    }
  };

  return (
    <div className="admin-dashboard-container">
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
     
        <Form onSubmit={handleAddClient}>
          <h3 style={{textAlign:"center",marginBottom:'20px',marginTop:"20px"}}>Personal Details</h3>

          <Row className="justify-content-center">

        {/* Male Image and Button */}
        <Col xs={6} md={4} style={{ textAlign: 'center' }}>
          <div>
            <Image 
              src="https://cdn.pixabay.com/photo/2014/04/02/10/56/restroom-304984_1280.png"
              alt="Male"
              style={{ width: '150px', height: '150px', objectFit: 'contain' }}
            />
          </div>
          <Button 
            variant={clientData.gender === 'Male'?'success' :'primary'}//to highlight on select
            onClick={() => handleGenderSelect('Male')}
            style={{ marginTop: '10px' }}
          >
            Male
          </Button>
        </Col>

        {/* Female Image and Button */}
        <Col xs={6} md={4} style={{ textAlign:'center' }}>
          <div>
            <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStU4MURwTzq2-55FhUA5inSXBy_xCsn0iXxg&s"
              alt="Female"
              style={{ width: '150px', height: '130px', objectFit: 'contain',marginTop:'20px' }}
            />
          </div>
          <Button 
            variant={clientData.gender === 'Female'?'success' :'primary'}//to highlight on select
            onClick={() => handleGenderSelect('Female')}
            style={{ marginTop: '13px' }}
          >
            Female
          </Button>
        </Col>
      </Row>

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
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter age"
              value={clientData.age}
              onChange={(e) =>setClientData({ ...clientData,age: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Height(cm)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter height"
              value={clientData.height}
              onChange={(e) =>setClientData({ ...clientData,height: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Weight(kg)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter weight"
              value={clientData.weight}
              onChange={(e) =>setClientData({ ...clientData,weight: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
          <Form.Label htmlFor="disabledSelect">Goal</Form.Label>
          <Form.Select
            id="gender"
            placeholder="Enter goal"
            value={clientData.goal}
            onChange={(e) =>setClientData({ ...clientData, goal:e.target.value})}
          >
            <option>select</option>
            <option>weight gain</option>
            <option>weight loss</option>
            <option>maintain weight</option>
          </Form.Select>
        </Form.Group>

          <Form.Group className="mb-3" style={{marginLeft:"10px",marginRight:"10px"}}>
            <Form.Label>Start Weight(kg)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter start weight"
              value={clientData.startweight}
              onChange={(e) =>setClientData({ ...clientData,startweight: e.target.value })}
            />
          </Form.Group>

          
          <Button variant="primary" type="submit" style={{marginLeft:"10px",marginRight:"10px",marginBottom:"20px"}}>
            Add Client
          </Button>
        </Form>
    </div>
  );
}

export default PersonalDetails;
