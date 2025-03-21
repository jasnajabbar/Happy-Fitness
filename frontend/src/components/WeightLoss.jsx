import ListGroup from 'react-bootstrap/ListGroup';

function WeightLossExercise() {
  return (
    <div>
        <h3 style={{textAlign:'center',color:'blue',marginTop:'20px'}}>Weight Loss</h3>
        <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Cardio Exercises (Best for Fat Burning)</h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Running / Jogging - One of the best calorie burners</ListGroup.Item>
      <ListGroup.Item>Jump Rope - High-intensity workout for fat loss</ListGroup.Item>
      <ListGroup.Item>Cycling - Burns fat while strengthening legs</ListGroup.Item>
      <ListGroup.Item>Swimming - Full-body workout with low impact</ListGroup.Item>
      <ListGroup.Item>Rowing Machine - Engages the upper and lower body</ListGroup.Item>
      <ListGroup.Item>Stair Climbing - Burns calories and strengthens legs</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>High-Intensity Interval Training (HIIT)</h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>30s Jump Squats → 10s rest</ListGroup.Item>
      <ListGroup.Item>30s Mountain Climbers → 10s rest</ListGroup.Item>
      <ListGroup.Item>30s Burpees → 10s rest</ListGroup.Item>
      <ListGroup.Item>30s Jump Rope → 10s rest</ListGroup.Item>
      <p>(Repeat for 3-4 rounds)</p>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}> Strength Training (Boosts Metabolism)</h4>
    <p style={{marginLeft:'20px'}}>Building muscle helps burn more calories even at rest</p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Squats - Works legs and core</ListGroup.Item>
      <ListGroup.Item>Deadlifts - Full-body strength builder</ListGroup.Item>
      <ListGroup.Item>Push-ups - Builds upper body strength</ListGroup.Item>
      <ListGroup.Item>Lunges - Tones legs and glutes</ListGroup.Item>
      <ListGroup.Item>Planks - Strengthens core</ListGroup.Item>
      <ListGroup.Item>Kettlebell Swings - Full-body fat burner</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Workout Plan for Weight Loss</h4>
    <p style={{marginLeft:'20px'}}>Frequency: 4-6 days per week</p>
    <p style={{marginLeft:'20px'}}>Duration: 30-60 minutes per session</p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Warm-up (5-10 min)</ListGroup.Item>
      <ListGroup.Item>Strength Training (20-30 min, 3-5 sets of 10-15 reps)</ListGroup.Item>
      <ListGroup.Item>Cardio / HIIT (20-30 min, 3-4 rounds)</ListGroup.Item>
      <ListGroup.Item>Cool Down & Stretching (5-10 min)</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Additional Tips</h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Caloric Deficit - Burn more calories than you eat</ListGroup.Item>
      <ListGroup.Item>Eat Protein & Fiber - Keeps you full longer</ListGroup.Item>
      <ListGroup.Item>Stay Hydrated - Drink plenty of water</ListGroup.Item>
      <ListGroup.Item>Sleep Well - Rest is crucial for weight loss</ListGroup.Item>
      <ListGroup.Item>Be Consistent - Results take time, stay motivated!</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default WeightLossExercise;