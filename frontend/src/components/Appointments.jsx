import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";

function BookAppointment() {
  const [trainers, setTrainers] = useState([]);
  const [username, setUsername] = useState(null);
  const [trainerName, setTrainerName] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  //Load username from localStorage once
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  //Fetch trainers once
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/myfitness/gettrainers`);
        setTrainers(response.data); // plain array, no extra data wrapper
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setError("Failed to load trainers.");
      }
    };
    fetchTrainers();
  }, []);

  //Fetch appointment only when username is available
  useEffect(() => {
    if (!username) return;

    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/myfitness/appointments/${username}`
        );

        if (response.data) {
          setTrainerName(response.data.trainerName || "");
          setDate(response.data.date || "");
          setSlot(response.data.slot || "");
          setStatus(response.data.status || "Pending");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
        if (error.response?.status === 404) {
          console.log("No appointment yet for", username);
          setStatus("Not Booked"); //no error shown
        } else {
          console.error("Error fetching appointment:", error);
          setStatus("");
        }
      }
    };

    fetchAppointment();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${SERVER_URL}/myfitness/bookappointment`,
        {
          username,
          trainerName,
          date,
          slot,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(response.data.message);
      setStatus("Pending");

      // Refresh appointment after booking
      const appointmentResp = await axios.get(
        `${SERVER_URL}/myfitness/appointments/${username}`
      );
      if (appointmentResp.data) {
        setTrainerName(appointmentResp.data.trainerName || "");
        setDate(appointmentResp.data.date || "");
        setSlot(appointmentResp.data.slot || "");
        setStatus(appointmentResp.data.status || "Pending");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Book an Appointment</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username || ""}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="trainer" className="mt-3">
          <Form.Label>Select Trainer</Form.Label>
          <Form.Control
            as="select"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            required
          >
            <option value="">Select a Trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer._id} value={trainer.username}>
                {trainer.username} ({trainer.email})
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="date" className="mt-3">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </Form.Group>

        <Form.Group controlId="slot" className="mt-3">
          <Form.Label>Choose Slot</Form.Label>
          <Form.Control
            type="text"
            placeholder="E.g., 10:00 AM"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="mt-3" disabled={loading || !username}>
          {loading ? <Spinner animation="border" size="sm" /> : "Book Appointment"}
        </Button>
      </Form>

      {status && (
        <div className="mt-4">
          <h5>
            Appointment Date & Time: <strong>{date} | {slot}</strong>
          </h5>
          <h5>
            Status:{" "}
            <span
              className={`badge ${
                status === "Pending"
                  ? "bg-warning"
                  : status === "Approved"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {status || "Pending"}
            </span>
          </h5>
        </div>
      )}
    </Container>
  );
}

export default BookAppointment;
