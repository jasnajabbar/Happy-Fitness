import ListGroup from 'react-bootstrap/ListGroup';

function WeightGainExercise() {
  return (
    <div>
        <h3 style={{textAlign:'center',color:'blue',marginTop:'20px'}}>Weight Gain</h3>
        <h4 style={{marginLeft:'20px',marginTop:'20px'}}><b>Compound Exercises (Best for Overall Mass Gain)</b></h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Squats - Strengthens legs and core</ListGroup.Item>
      <ListGroup.Item>Deadlifts - Works the entire body, especially the back and legs</ListGroup.Item>
      <ListGroup.Item>Bench Press - Builds chest, shoulders, and triceps</ListGroup.Item>
      <ListGroup.Item>Overhead Press (Military Press) - Strengthens shoulders and upper body</ListGroup.Item>
      <ListGroup.Item>Pull-ups / Chin-ups - Great for back and biceps</ListGroup.Item>
      <ListGroup.Item>Rows (Barbell or Dumbbell Rows) – Develops the back muscles</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Isolation Exercises (For Targeted Muscle Growth)</h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Bicep Curls - Targets biceps</ListGroup.Item>
      <ListGroup.Item>Triceps Dips - Strengthens triceps</ListGroup.Item>
      <ListGroup.Item>Lateral Raises - Focuses on shoulders</ListGroup.Item>
      <ListGroup.Item>Leg Curls & Extensions - Isolate the hamstrings and quads</ListGroup.Item>
      <ListGroup.Item>Calf Raises - Strengthens calves</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Workout Plan for Weight Gain</h4>
    <p style={{marginLeft:'20px'}}><b>3-5 Days Per Week (Full Body or Split Routine)</b></p>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Start with a warm-up (5-10 min)</ListGroup.Item>
      <ListGroup.Item>Focus on compound lifts (3-5 sets of 6-12 reps)</ListGroup.Item>
      <ListGroup.Item>Add isolation exercises (3-4 sets of 10-15 reps)</ListGroup.Item>
      <ListGroup.Item>Increase weights gradually (progressive overload)</ListGroup.Item>
      <ListGroup.Item>Ensure proper rest (at least 48 hours between workouts for the same muscle group)</ListGroup.Item>
    </ListGroup>

    <h4 style={{marginLeft:'20px',marginTop:'20px'}}>Additional Tips</h4>
    <ListGroup style={{marginLeft:'20px'}}>
      <ListGroup.Item>Eat a Caloric Surplus - Consume more calories than you burn</ListGroup.Item>
      <ListGroup.Item>High Protein Intake - Eat at least 1.6-2.2g of protein per kg of body weight</ListGroup.Item>
      <ListGroup.Item>Healthy Fats & Carbs - Include good fats (nuts, avocados) and carbs (rice, oats, potatoes)</ListGroup.Item>
      <ListGroup.Item>Stay Consistent - Stick to a routine and track progress</ListGroup.Item>
    </ListGroup>
    </div>
  );
}

export default WeightGainExercise;