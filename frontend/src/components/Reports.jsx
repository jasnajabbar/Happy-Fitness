import { useState,useEffect,useCallback} from 'react';
import { Line } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import{ Chart,registerables} from 'chart.js'
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';


Chart.register(...registerables);

const WeightReport = () => {
    const username = localStorage.getItem("username") || "";
    const location = useLocation();
    const navigate=useNavigate();

  const [chartData,setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Weight Progress',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
        pointHoverBorderColor: 'rgb(71, 225, 167)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

    const fetchWeightData=useCallback(async() =>{
        try {
            if (!username) {
                console.error("No username found in LocalStorage.");
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/myfitness/weighthistory/${username}`);
           
            const weightEntries=response.data.data;
            console.log("API Response:", weightEntries);

            if (!Array.isArray(weightEntries)) {
                console.error("Expected an array but received:", weightEntries);
                return;
            }

            //sort by date
            weightEntries.sort((a,b)=>new Date(a.date)-new Date(b.date))

            const dates = weightEntries.map(entry => {
              console.log("Processing Entry:", entry);
              return entry.date ? new Date(entry.date).toLocaleDateString() : "Invalid Date";
            });

            const weights = weightEntries.map(entry => 
              Number(entry.weight) || 0
            );

            setChartData(previousData=>({
                ...previousData,
                labels: dates,
                datasets: [
                  {
                    ...previousData.datasets[0],
                    data: weights,
                  },
                ],
              }));
        } catch (error) {
            console.error('Error fetching weight data:', error);
        }
    },[username]);

    useEffect(() => {
        fetchWeightData();
      }, [fetchWeightData,location.state]); //re-fetch when navigating with state
    
   
  return (
    <div>
    <CDBContainer>
      <h3 className="mt-5">Weight Progress Report</h3>
      <Line data={chartData} options={{responsive: true}} />
    </CDBContainer>
    <div style={{textAlign:"right", marginTop:"25px",marginRight:"30px",marginBottom:"30px"}}>
    <Button variant="outline-primary" onClick={() =>{
        console.log("Navigating to Health Report...");
        navigate('/healthReport')}}>
            Next</Button>

    </div>
    </div>
  );
};
export default WeightReport;