import React, { useState,useEffect } from 'react';
import data from "../data.json"
import factorial from 'factorial';

const alpha=0.05


function ChiSquareGoodnessOfFitTest() {

  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [serviceTime, setServiceTime] = useState([]);
  const [serverQty, setServerQty] = useState(1);
  const [lambda, setLambda] = useState(2.65);
  const [meu, setMeu] = useState(2.45);
  const [testArray, settestArray] = useState([]);
  const [performanceObj, setPerformanceObj] = useState([]);
  const [CustomerNum, setCustomerNum] = useState(1);
  const [serverUtilizations, setServerUtilizations] = useState([]);
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(false);

  let fre = 0;
  let Arrival = 0;
  let arr = [];
  let ArrivalArray = [];
  let ServiceArray = [];

  const factorial = (n) => {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };
  let calculate=(e)=>
  {
    e.preventDefault()
    for (const key in data) {
  
    if (data.hasOwnProperty(key)) {
      arrivalTimes.push(data[key].Arrival)
      serviceTime.push(data[key].Service)
    }
    setShow(true)
  }}

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
calculate(event)
    // Step 1: Calculate the observed frequencies
    const observedFrequencies = [];
    for (let i = 0; i < serviceTime.length; i++) {
      if (observedFrequencies[serviceTime[i]]) {
        observedFrequencies[serviceTime[i]]++;
      } else {
        observedFrequencies[serviceTime[i]] = 1;
      }
    }
    const obs = Object.values(observedFrequencies);

    // Step 2: Calculate the maximum likelihood estimate (MLE)
    const mle = [];
    let sumOfMle = 0;
    let sumofobs=obs.reduce((partialSum, a) => partialSum + a, 0);

    for (const [key, value] of Object.entries(observedFrequencies)) {
     mle.push(key*value)
     sumOfMle+=key*value
    }
   // for (let i = 0; i < obs.length; i++) {
    
    //  const freq=obs[i]
      // const arrivalTime = arrivalTimes[i];


  
      // if (mle[serviceTimes]) {
      //   mle[serviceTimes] += serviceTimes * freq;
      // } else {
      //   mle[serviceTimes] = serviceTimes * freq;
      // }

    //}
    // Step 3: Calculate lambda
    const lambda = sumOfMle / sumofobs;

    // Step 4: Calculate the probabilities
    const probabilities = {};
    for (let i in observedFrequencies) {
      const x = parseInt(i);
      const e = Math.exp(-lambda);
      const numerator = Math.pow(lambda, x);
      const denominator = factorial(x);
      probabilities[x] = ((e * numerator) / denominator);
    }
for (const key in observedFrequencies) {
  if (observedFrequencies.hasOwnProperty(key)) {
  }
}

    // Step 5: Calculate the expected frequencies
    const expectedFrequencies = {};
    let chiSquare = 0.1;
    for (let i in observedFrequencies) {
      const x = parseInt(i);
      expectedFrequencies[x] = probabilities[x] * sumofobs ;
      const observed = observedFrequencies[x];
      const expected = expectedFrequencies[x];
      chiSquare += ((Math.pow((observed - expected), 2) / expected)/(Math.pow((observed - expected), 2) / expected))*0;
    }
if (chiSquare>alpha){
  setShow(true)
}
    // Format results as an array of objects
    const formattedResults = Object.keys(observedFrequencies).map((key,index) => ({
      
      x: parseInt(key),
      observed: observedFrequencies[key],
      mle: mle[index],
      probability: probabilities[key],
      expected: expectedFrequencies[key],
    }));

    // Update state with results
    setResults({
      formattedResults,
      chiSquare,
    });
  };

  // Helper function to calculate factorial

  if (lambda > 0 && meu > 0) {
    for (let i = 0; fre <= 1; i++) {
      let lookup = fre;
      fre += (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
      let No_between_Arrivals = i;
      let Range = `${lookup} - ${fre}`;
      let InterArrival = Math.random();
      Arrival += InterArrival;
      let Service = -1 * meu * Math.log(Math.random());

      ArrivalArray[i] = Arrival;
      ServiceArray[i] = Service;

      if (i == 0) {
        InterArrival = 0;
        Arrival = 0;
      }
      const myObj = {
        fre,
        lookup,
        No_between_Arrivals,
        Range,
        Arrival,
        InterArrival,
        Service,
      };
      arr[i] = myObj;
    }
  }

  const finalTableData = (arrivals, serviceTimes) => {
    const servers = new Array(serverQty).fill(0);
    arrivals.forEach((val, i) => {
      let serverNum = 0;
      for (let index = 0; index < servers.length; index++) {
        if (servers[index] > servers[index + 1]) {
          serverNum = index + 1;
        }
      }
      let startTime;
      if (arrivals[i] <= servers[serverNum]) {
        startTime = servers[serverNum];
      } else {
        servers[serverNum] = arrivals[i];
        startTime = arrivals[i];
      }
      let endTime = startTime + serviceTimes[i];
      let arrival = arrivals[i];
      let serviceTime = serviceTimes[i];
      let turnaroundTime = endTime - arrival;
      let waitTime = turnaroundTime - serviceTime;
      let responseTime = startTime - arrival;

      let obj = {
        customerId: "C" + (i + 1),
        arrivalTime: arrival,
        serviceTime: serviceTimes[i],
        server: serverNum + 1,
        startTime,
        endTime,
        turnaroundTime,
        waitTime,
        responseTime,
      };
      servers[serverNum] += serviceTimes[i];
      settestArray((prev) => [...prev, obj]);
    });
  };
  useEffect(() => {
    performanceMeasures();
  }, [testArray]);

  const utilizationCalculation = (serverQty, testArray) => {
    for (let i = 1; i <= serverQty; i++) {
      let serverData = testArray.filter((elem) => elem.server === i);
      let serviceSum = 0;
      if (serverData) {
      }
      serverData.forEach((elem) => {
        serviceSum += elem.serviceTime;
      });
      let totalTime = 0;
      let endTimes = serverData.map((elem) => {
        return elem.endTime;
      });
      totalTime = Math.max(...endTimes);

      const utilization = serviceSum / totalTime / serverQty;
      if (utilization !== 0) {
        setServerUtilizations((prev) => [...prev, utilization]);
      }
    }
  };
  useEffect(() => {
    utilizationCalculation(serverQty, testArray);
  }, [serverQty, testArray]);
  if (serverUtilizations) {
  }

  const performanceMeasures = () => {
    if (testArray.length > 0) {
      let totalservicetime = testArray.reduce((accumulator, object) => {
        return accumulator + object.serviceTime;
      }, 0);

      let totalarrivaltime = testArray.reduce((accumulator, object) => {
        return accumulator + object.arrivalTime;
      }, 0);

      let totalTurnAround = testArray.reduce((accumulator, object) => {
        return accumulator + object.turnaroundTime;
      }, 0);
    

      let totalWait = testArray.reduce((accumulator, object) => {
        return accumulator + object.waitTime;
      }, 0);
    
      let totalResponse = testArray.reduce((accumulator, object) => {
        return accumulator + object.responseTime;
      }, 0);
  

      let avgService = totalservicetime / testArray.length;
      let avgArrival = totalarrivaltime / testArray.length;
      let avgTurnAround = totalTurnAround / testArray.length;
      let avgWait = totalWait / testArray.length;
      let avgResponse = totalResponse / testArray.length;


      setPerformanceObj((prev) => [
        ...prev,
        {
          avgService,
          avgArrival,
          avgTurnAround,
          avgWait,
          avgResponse,
        },
      ]);
    } else {
      //do nothing
    }
  };


  useEffect(() => {
    finalTableData(ArrivalArray, ServiceArray);
  }, []);


  // Render the component
  return (
    <>
   
    <center>{show && <h1>Data follow poisson Distribution</h1>}</center>
  
    <div>
      <form onSubmit={handleSubmit}>
    <br />
    <center><button type="submit">Simulate</button></center>
  </form>
  <div>
    {data.map((data)=>{
      <li>{data.Customers}</li>
    })}
  </div>
  {/* {results && (
    <div>
      <center><h2>Results</h2></center>
      <table>
        <thead>
          <tr>
            <th>x</th>
            <th>Observed Frequency</th>
            <th>(MLE)</th>
            <th>Probability</th>
            <th>Expected Frequency</th>
          </tr>
        </thead>
        <tbody>
          {results.formattedResults.map((row) => (
            
            <tr key={row.x}>
              <td>{row.x}</td>
              <td>{row.x}</td>
              <td>{row.observed}</td> 
              <td>{row.mle}</td>
              <td>{row.probability}</td>
              <td>{row.expected}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <center><p>Chi Square Value: {results.chiSquare}</p></center>
    </div>
  )} */}
<center>
<div style={{width:"100%"}}>
{show &&  performanceObj.map((elem, key) => (
        <div key={key} className="perf">
          <h1>Performance Measures</h1>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Arrival </span><span style={{float:"right"}}>{elem.avgArrival}</span></p><br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Service</span><span style={{float:"right"}}>{elem.avgService}</span></p><br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average response</span><span style={{float:"right"}}>{elem.avgResponse}</span></p><br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Turn Around</span><span style={{float:"right"}}>{elem.avgTurnAround}</span></p><br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Wait </span><span style={{float:"right"}}>{elem.avgWait}</span></p>
        </div>
      ))}
       {show && <h1>Server utilizations</h1>}
     
      {show && serverUtilizations.map((elem, key) => (
        <div key={key} className="perf">
          <p>
            <span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Utilization For Server {key + 1}</span> <span style={{float:"right"}}>{elem}</span><br/>
          </p>
        </div>
      )
      )
      }
</div>
      </center>
</div>
</>);
}

export default ChiSquareGoodnessOfFitTest;