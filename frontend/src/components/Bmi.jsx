import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const calculateBMI = () => {
    const weightNum = parseFloat(weight.trim());
    const heightNum = parseFloat(height.trim());

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid weight and height');
      return;
    }

    const heightInMeters=heightNum / 100;
    const bmiValue=(weightNum / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  useEffect(() => {
    if (bmi !== null) {
      const timer=setTimeout(() => {
        navigate('/weightlog');
      }, 1000);
      return ()=> clearTimeout(timer);
    }
  }, [bmi,navigate]);

  return (
    <Container
      className="d-flex flex-column align-items-center mt-5"
      style={{
        backgroundImage:`url(https://as1.ftcdn.net/v2/jpg/06/80/42/72/1000_F_680427242_N5ZAY1vWlP0hCHmdDS5PLNL6TJQ2tIFa.jpg)`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        minHeight:'100vh',
        width:'100%',
      }}
    >
      <Card style={{ width:'400px',padding:'20px' }}>
        <h3 className="text-center">BMI Calculator</h3>
        <Form>
          <Form.Group>
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) =>setWeight(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) =>setHeight(e.target.value)}
            />
          </Form.Group>

          <Button
            className="mt-3 w-100"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              calculateBMI();
            }}
          >
            Calculate BMI
          </Button>
        </Form>

        {bmi && (
          <div className="text-center mt-4">
            <h4>Your BMI: {bmi}</h4>
            <h5 className={category === 'Obese' ? 'text-danger' : 'text-success'}>{category}</h5>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default BMICalculator;
