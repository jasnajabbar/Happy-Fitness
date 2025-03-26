import axios from 'axios';
import { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';

function ReportPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    
        const fetchUserData = useCallback(async () => {
            const storedUsername = localStorage.getItem('username'); // Fetch stored username
            if (!storedUsername) {
                setError('Username not found. Please log in.');
                navigate('/login'); // Redirect to login if no username
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/myfitness/user/${storedUsername}`.replace(/([^:]\/)\/+/g, "$1"), {
                    headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}, // Send token if required
                    withCredentials:true
                });

                setUserData(response.data);
            } catch (err) {
                setError('Failed to fetch user report.');
                console.error('Error fetching user report:', err);
            } finally {
                setLoading(false);
            }
        },[navigate]);

        useEffect(() => {
            fetchUserData();
        }, [fetchUserData]); 
    

    if (loading) {
        return <Spinner animation="border" role="status" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Alert variant="danger" style={{ textAlign: 'center' }}>{error}</Alert>;
    }

    return (
        <div className="container mt-4">
            <h3 className="text-center">Health Report</h3>
            <Card className="p-3 shadow-sm">
                <Card.Body>
                    <Card.Title className="text-primary">{userData.username}</Card.Title>
                    <Card.Text>
                        <strong>Goal:</strong> {userData.goal}<br />
                        <strong>Current Weight:</strong> {userData.currentWeight} kg<br />
                        <strong>BMI:</strong> {userData.BMI}<br />
                        <strong>Health Issue:</strong> {userData.healthIssue}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ReportPage;
