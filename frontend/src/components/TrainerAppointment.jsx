import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Alert, Spinner } from "react-bootstrap";

function TrainerAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments =async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/myfitness/getappointments`.replace(/([^:]\/)\/+/g, "$1"));
        console.log("Get Fetched appointments:", response.data); 
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:",error);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // Handle approval or rejection
  const handleAction = async(username,status) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/myfitness/updateappointment`.replace(/([^:]\/)\/+/g, "$1"), {username,status});
      
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.username === username ?{ ...appointment,status}:appointment
        )
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating appointment:",error);
      setError("Failed to update appointment status.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Trainer Appointments</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Username</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>{appointment.username}</td>
                <td>{appointment.trainerName || "N/A"}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>
                  <span
                    className={`badge ${
                      appointment.status === "Approved"
                        ? "bg-success"
                        : appointment.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {appointment.status === "Pending" && (
                    <>
                      <Button variant="success" size="sm" onClick={() =>handleAction(appointment.username,"Approved")}>
                        Approve
                      </Button>{" "}
                      <Button variant="danger" size="sm" onClick={() =>handleAction(appointment.username,"Rejected")}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default TrainerAppointments;
