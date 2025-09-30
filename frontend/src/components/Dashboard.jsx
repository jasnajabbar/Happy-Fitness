import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card style={{width:"400px",padding:"20px",textAlign:"center"}}>
        <h2>Dashboard</h2>
        <Button className="mt-3 w-100" variant="primary" onClick={() =>navigate("/settings")}>
          Settings
        </Button>
        <Button className="mt-3 w-100" variant="success" onClick={() =>{console.log("Navigating to /reportpage");
            navigate("/reportpage")}}>
          Report
        </Button>
        <Button className="mt-3 w-100" variant="warning" onClick={() =>navigate("/bmi")}>
          Calculate BMI
        </Button>
      </Card>
    </Container>
  );
}

export default Dashboard;
