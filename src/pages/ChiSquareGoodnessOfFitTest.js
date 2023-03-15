import React, { useState,useEffect } from 'react';
import data from "../data.json"
// import factorial from 'factorial';

const alpha=0.05


function ChiSquareGoodnessOfFitTest() {
  // Iterate through the object
 
  
  // Initialize state variables
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [serviceTime, setServiceTime] = useState([]);
  const [serverQty, setServerQty] = useState(1);
  const [lambda, setLambda] = useState(2.65);
  const [meu, setMeu] = useState(2.45);
  const [testArray, settestArray] = useState([]);
  const [performanceObj, setPerformanceObj] = useState([]);
  const [CustomerNum, setCustomerNum] = useState(1);
  const [serverUtilizations, setServerUtilizations] = useState([]);
  const [show, setShow] = useState(false);

  let commulativeF = 0;
  let Arrival = 0;
  let arr = [];
  let ArrivalArray = [];
  let ServiceArray = [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const factorial = (n) => {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };
  if (lambda > 0 && meu > 0) {
    for (let i = 0; commulativeF <= 1; i++) {
      let lookup = commulativeF;
      commulativeF += (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
      let No_between_Arrivals = i;
      let Range = `${lookup} - ${commulativeF}`;
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
        commulativeF,
        lookup,
        No_between_Arrivals,
        Range,
        Arrival,
        InterArrival,
        Service,
      };
      arr[i] = myObj;
    }
    console.log(ArrivalArray);
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
      console.log(testArray);
      let serverData = testArray.filter((elem) => elem.server === i);
      let serviceSum = 0;
      if (serverData) {
        console.log("server data", serverData);
      }
      serverData.forEach((elem) => {
        serviceSum += elem.serviceTime;
      });
      console.log(serviceSum);
      let totalTime = 0;
      let endTimes = serverData.map((elem) => {
        return elem.endTime;
      });
      console.log(endTimes);
      totalTime = Math.max(...endTimes);
      console.log(totalTime);

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
    console.log(serverUtilizations);
  }

  const performanceMeasures = () => {
    console.log(testArray.length);
    if (testArray.length > 0) {
      let totalservicetime = testArray.reduce((accumulator, object) => {
        return accumulator + object.serviceTime;
      }, 0);
      console.log(totalservicetime);

      let totalarrivaltime = testArray.reduce((accumulator, object) => {
        return accumulator + object.arrivalTime;
      }, 0);
      console.log(totalarrivaltime);

      let totalTurnAround = testArray.reduce((accumulator, object) => {
        return accumulator + object.turnaroundTime;
      }, 0);
      console.log(totalTurnAround);

      let totalWait = testArray.reduce((accumulator, object) => {
        return accumulator + object.waitTime;
      }, 0);
      console.log(totalWait);

      let totalResponse = testArray.reduce((accumulator, object) => {
        return accumulator + object.responseTime;
      }, 0);
      console.log(totalResponse);

      let avgService = totalservicetime / testArray.length;
      let avgArrival = totalarrivaltime / testArray.length;
      let avgTurnAround = totalTurnAround / testArray.length;
      let avgWait = totalWait / testArray.length;
      let avgResponse = totalResponse / testArray.length;

      console.log("avgService", avgService);
      console.log("avgArrival", avgArrival);
      console.log("avgTurnAround", avgTurnAround);
      console.log("avgWait", avgWait);
      console.log("avgResponse", avgResponse);

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
  if (performanceObj) {
    console.log(performanceObj);
  }
  // useEffect(()=>{
  // },[testArray])

  useEffect(() => {
    finalTableData(ArrivalArray, ServiceArray);
  }, []);

























  const [results, setResults] = useState(null);
  let calculate=(e)=>
  {
    e.preventDefault()
    for (const key in data) {
    console.log(data);
    if (data.hasOwnProperty(key)) {
      // console.log(`${key}: ${data[key].Arrival}`);
      arrivalTimes.push(data[key].Arrival)
      serviceTime.push(data[key].Service)
    }
    setShow(true)
  }}

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
calculate(event)
console.log(serviceTime);
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
    console.log("obs",Object.values(observedFrequencies));

    // Step 2: Calculate the maximum likelihood estimate (MLE)
    const mle = [];
    let sumOfMle = 0;
    let sumofobs=obs.reduce((partialSum, a) => partialSum + a, 0);

    for (const [key, value] of Object.entries(observedFrequencies)) {
     mle.push(key*value)
     sumOfMle+=key*value
    }
    console.log(mle);
   // for (let i = 0; i < obs.length; i++) {
    
    //  const freq=obs[i]
      // const arrivalTime = arrivalTimes[i];
      // console.log(serviceTimes);
    //  console.log(freq);
  
      // if (mle[serviceTimes]) {
      //   mle[serviceTimes] += serviceTimes * freq;
      // } else {
      //   mle[serviceTimes] = serviceTimes * freq;
      // }

    //}
console.log(sumofobs);
console.log(mle);
console.log(sumOfMle);
    // Step 3: Calculate lambda
    const lambda = sumOfMle / sumofobs;
console.log(lambda);
    // Step 4: Calculate the probabilities
    const probabilities = {};
    for (let i in observedFrequencies) {
      const x = parseInt(i);
      console.log(x);
      const e = Math.exp(-lambda);
      const numerator = Math.pow(lambda, x);
      const denominator = factorial(x);
      probabilities[x] = ((e * numerator) / denominator);
      console.log(e);
    }
for (const key in observedFrequencies) {
  if (observedFrequencies.hasOwnProperty(key)) {
    console.log(`${key}: ${observedFrequencies[key]}`);
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
    console.log(mle)
  };

  // Helper function to calculate factorial

  let nkey=0


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