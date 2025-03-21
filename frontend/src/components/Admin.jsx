import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{
        backgroundColor: '#FFC5D3',
        minHeight: '100vh',
        textAlign: 'center',
        position: 'relative',
        paddingTop: '25px',
      }}>
    <Container className="text-center mt-5" >
      <h2>Welcome Admin</h2>
      <p>Manage trainers, clients, and reports.</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="primary" onClick={() => navigate('/adminpanel')}>
          Add Trainer/Client
        </Button>
      
        <Button variant="success" onClick={() => navigate('/trainerDashboard')}>
          Client Reports
        </Button>
      </div>
    </Container>
    </div>
  );
}

export default AdminDashboard;
