import React, { useState, useEffect, useRef } from "react";
import factorial from "factorial";
function RandomNumberSimulation() {
  const [serverQty, setServerQty] = useState();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div>
      
     <center> <h1>Random Number Simulation</h1></center>
      <form onSubmit={handleSubmit} style={{ width: "50%" ,margin:"0 auto"}}>
       
        <input
          type="text"
          placeholder="Enter value of lambda in minutes"
          min={0}
          required 
        />
        <input
          type="text"
          placeholder="Enter value of meu in minutes"
          min={0}
          required
        />
        <input
          type="number"
          placeholder="enter no of servers"
          onChange={(e) => setServerQty(e.target.value)}
          min={0}
          required
        />
        <center><button>Simulate</button></center>
      </form>
   <center>
     {show &&  performanceObj.map((elem, key) => (
        <div key={key} className="perf">
          <h1>Performance Measures</h1>
          <p><span style={{fontWeight:"bolder",marginRight:"15px"}}> Average Arrival </span>{elem.avgArrival}</p>
          <p><span style={{fontWeight:"bolder",marginRight:"15px"}}>Average Service</span>{elem.avgService}</p>
          <p><span style={{fontWeight:"bolder",marginRight:"15px"}}>Average response</span>{elem.avgResponse}</p>
          <p><span style={{fontWeight:"bolder",marginRight:"15px"}}>Average Turn Around</span>{elem.avgTurnAround}</p>
          <p><span style={{fontWeight:"bolder",marginRight:"15px"}}>Average Wait</span> {elem.avgWait}</p>
        </div>
      ))}
      
        {" "}
       {show && <h1>Server utilizations</h1>}
     
      {show && serverUtilizations.map((elem, key) => (
        <div key={key} className="perf">
          <p>
            {" "}
            <span style={{fontWeight:"bolder",marginRight:"15px"}}>
            Utilization For Server
            </span>
             {key + 1} {elem}
          </p>
        </div>
      )
      )
      }
      </center>
    </div>
  );
}

export default RandomNumberSimulation;
