import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner, Alert } from "react-bootstrap";

function ReportPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserData = useCallback(async () => {
    const storedUsername = localStorage.getItem("username"); // Fetch stored username
    if (!storedUsername) {
      setError("Username not found. Please log in.");
      navigate("/login"); // Redirect to login if no username
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/myfitness/healthreport/${storedUsername}`.replace(
          /([^:]\/)\/+/g,
          "$1"
        )
      );

      setUserData(response.data); // This now contains goal, currentWeight, BMI
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return (
      <Spinner
        animation="border"
        role="status"
        style={{ display: "block", margin: "20px auto" }}
      />
    );
  }

  if (error) {
    return (
      <Alert variant="danger" style={{ textAlign: "center" }}>
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center">Health Report</h3>
      <Card className="p-3 shadow-sm">
        <Card.Body>
          <Card.Title className="text-primary">{userData.username}</Card.Title>
          <Card.Text>
            <strong>Goal:</strong> {userData.goal || "Not set"}
            <br />
            <strong>Current Weight:</strong> {userData.weight || "Not set"} kg
            <br />
            <strong>BMI:</strong> {userData.BMI || "Not set"}
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReportPage;
