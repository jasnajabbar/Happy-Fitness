import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TrainerDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/myfitness/users`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
          }
        );

        console.log("API Response:", response.data);

        // Fix: use response.data.data because backend sends { success: true, data: [...] }
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setUsers([]);
          console.error("Unexpected response format:", response.data);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(`Failed to fetch user data: ${error.message}`);
      } finally {
        setLoading(false);
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
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.goal}</td>
                  <td>{user.weight || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default TrainerDashboard;
