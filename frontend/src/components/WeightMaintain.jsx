import ListGroup from 'react-bootstrap/ListGroup';

function WeightMaintainExercise() {
  return (
    <div>
        <h3 style={{textAlign:'center',color:'blue',marginTop:'20px'}}>Weight Maintenance</h3>
        <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Cardiovascular Exercises (Heart Health & Stamina)</h4>
        <p style={{marginLeft:'20px'}}><b>Doing cardio 3-5 times a week improves heart health and burns calories.</b></p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Brisk Walking (30-45 min)</ListGroup.Item>
      <ListGroup.Item>Jogging or Running (20-30 min)</ListGroup.Item>
      <ListGroup.Item>Cycling (30 min)</ListGroup.Item>
      <ListGroup.Item>Swimming (30 min, full-body workout)</ListGroup.Item>
      <ListGroup.Item>Jump Rope (Great for endurance)</ListGroup.Item>
      <ListGroup.Item>Dancing (Fun and effective)</ListGroup.Item>
    </ListGroup>

        <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Strength Training (Muscle & Bone Health)</h4>
        <p style={{marginLeft:'20px'}}><b>Strength training 2-3 times a week prevents muscle loss and improves metabolism.</b></p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Squats - Strengthens legs and core</ListGroup.Item>
      <ListGroup.Item>Push-ups - Builds upper body strength</ListGroup.Item>
      <ListGroup.Item>Lunges - Improves balance and leg strength</ListGroup.Item>
      <ListGroup.Item>Planks - Core stability and posture improvement</ListGroup.Item>
      <ListGroup.Item>Resistance Band Workouts - Low-impact strength training</ListGroup.Item>
      <ListGroup.Item>Bodyweight Exercises - Great for functional fitness</ListGroup.Item>
    </ListGroup>

        <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Flexibility & Mobility (Prevent Stiffness & Injuries)</h4>
        <p style={{marginLeft:'20px'}}><b>Including stretching and mobility exercises keeps joints healthy.</b></p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Yoga (2-3 times a week for flexibility and relaxation)</ListGroup.Item>
      <ListGroup.Item>Dynamic Stretching (Before workouts)</ListGroup.Item>
      <ListGroup.Item>Static Stretching (After workouts)</ListGroup.Item>
      <ListGroup.Item>Foam Rolling (For muscle recovery)</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Workout Plan for Weight Maintenance</h4>
    <p style={{marginLeft:'20px'}}><b>Frequency: 3-5 Days a Week</b></p>
    <p style={{marginLeft:'20px'}}><b>Duration: 30-60 minutes per session</b></p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Warm-up (5-10 min) - Light cardio & stretching</ListGroup.Item>
      <ListGroup.Item>Strength Training (20-30 min) - 3-4 exercises, 3 sets each</ListGroup.Item>
      <ListGroup.Item>Cardio (20-30 min) - Walking, jogging, cycling, etc</ListGroup.Item>
      <ListGroup.Item>Flexibility & Mobility (5-10 min) - Stretching or yoga</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Additional Tips</h4>
    <ListGroup style={{marginLeft:'20px'}}  >
      <ListGroup.Item>Stay Active Daily - Even simple activities like walking help</ListGroup.Item>
      <ListGroup.Item>Eat a Balanced Diet - Whole foods, lean protein, healthy fats, and fiber</ListGroup.Item>
      <ListGroup.Item>Hydrate Well - At least 2-3 liters of water daily</ListGroup.Item>
      <ListGroup.Item>Sleep Well - Aim for 7-9 hours of quality sleep</ListGroup.Item>
      <ListGroup.Item>Manage Stress - Yoga, meditation, or deep breathing exercises</ListGroup.Item>
    </ListGroup>

    </div>
  );
}

export default WeightMaintainExercise;