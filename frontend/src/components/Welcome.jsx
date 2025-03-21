import {Container,Row,Col,Image, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WelcomePage(){
    return(
        <div> 
            <h2 style={{textAlign:"center"}}>Welcome to</h2>
            <h1 style={{textAlign:"center", marginBottom:"20px"}}>
            Happy Fitness
            </h1>

            <Link to='/login'>
            <Button type='button' className="btn btn-light" 
            style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                borderRadius: '50px', 
                padding: '5px 10px' 
              }}>Login</Button>
            </Link>

    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uUXwGrqsedwjoKS8kPqxOAHo0_rMzdRnBA&s" thumbnail style={{width:'300px',height:'250px',objectFit:"cover",marginBottom:"20px"}}/>
        <h4>Track your journey to better health, one step at a time!</h4>
        </Col>
        <Col xs={6} md={4}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnCknqSB-CaaisuG2SsSgU_NIq9YLccZDIXw&s" thumbnail style={{width:'300px',height:'250px',objectFit:"cover",marginBottom:"20px"}}/>
          <h4>Unlock the power of food and fitness—track with ease!</h4>
        </Col>
        <Col xs={6} md={4}>
          <Image src="https://www.shutterstock.com/image-vector/infographic-design-template-food-concept-260nw-1918204118.jpg" thumbnail style={{width:'300px',height:'250px',objectFit:"cover",marginBottom:"20px"}}/>
          <h4>Ready to see the change? Start tracking your progress today!</h4>
          
        </Col>
      </Row>
    </Container>
    <div className="mt-4" style={{textAlign:"center"}}>
                <Link to="/details">
                  <button type="button" className="btn btn-primary w-25" >
                    Continue
                  </button>
                </Link>
              </div>
        </div>
    )
}

export default WelcomePage;