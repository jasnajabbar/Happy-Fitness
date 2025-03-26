import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert,Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

function TrainerDashboard() {
  const [users,setUsers] =useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUsers =async () => {
      try {
        const response =await axios.get(`${import.meta.env.VITE_SERVER_URL}/myfitness/users`.replace(/([^:]\/)\/+/g, "$1"), {
           
            withCredentials: true, // If backend expects cookies too
          });
        console.log("API Response:",response.data);

        if (response.status !== 200) {
            throw new Error(`Unexpected response code: ${response.status}`);
          }

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setUsers([]); // Ensure it's an empty array if data is not in expected format
          console.error("Unexpected response format:", response.data);
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(`Failed to fetch user data: ${error.message}`);
        setLoading(false);
      }finally {
        setLoading(false); // Ensure loading state is always updated
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">User Report</h2>
        <Button variant="primary" onClick={() => navigate("/getappointments")}>
          View Appointments
        </Button>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Goal</th>
              <th>Current Weight (kg)</th>
              <th>BMI</th>
              <th>Health Issue</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.goal}</td>
                <td>{user.currentWeight}</td>
                <td>{user.BMI}</td>
                <td>{user.healthIssue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default TrainerDashboard;
