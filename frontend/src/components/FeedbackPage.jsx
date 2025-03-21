import  { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Star icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setMessage("Please select a rating!");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/myfitness/feedback`, {
                username: localStorage.getItem('username'),
                rating,
                description
            });

            if (response.status === 200) {
                setMessage("Feedback submitted successfully!");
                setTimeout(() => navigate('/settings'), 1500);
            }
        } catch (error) {
            setMessage("Failed to submit feedback.");
            console.error("Feedback Error:", error);
        }
    };

    return (
        <div style={{textAlign:'center',padding:'20px',minHeight:'100vh' }}>
            <h2>Feedback</h2>

            {/* Star Rating */}
            <div style={{marginBottom:'20px' }}>
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onClick={() =>setRating(currentRating)}
                                style={{ display: 'none' }}
                            />
                            <FaStar
                                size={30}
                                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                                style={{ cursor: "pointer" }}
                            />
                        </label>
                    );
                })}
            </div>

            {/* Description (Optional) */}
            <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                <Form.Group className="mb-3">
                    <Form.Label>Comments (Optional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Share your experience..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
                {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
            </Form>
        </div>
    );
}

export default FeedbackPage;
