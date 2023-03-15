import React, { useState, useEffect } from "react";
import factorial from "factorial";
function RandomNumberSimulation() {
  const [serverQty, setServerQty] = useState();
  const [lambda, setLambda] = useState();
  const [meu, setMeu] = useState();
  const [testArray, settestArray] = useState([]);
  const [old, setOld] = useState([]);
  const [performanceObj, setPerformanceObj] = useState([]);
  const [serverUtilizations, setServerUtilizations] = useState([]);
  const [showTable, setShowTable] = useState(false)
  const [show, setShow] = useState(false)

  const handleServiceRateChange = (event) => {
    setMeu(parseFloat(event.target.value));
  };

  const handleArrivalRateChange = (event) => {
    setLambda(parseFloat(event.target.value));
  };

  const handleNumServersChange = (event) => {
    setServerQty(parseInt(event.target.value));
  };
  let arr = [];
  let ArrivalArray = [];
  let ServiceArray = [];

  function runSimulation() {
    setShow(true)
    if (lambda > 0 && meu > 0) {
      let commulativeF = 0;
      let Arrival = 0;
      for (let i = 0; commulativeF < 1; i++) {
        let lookup = commulativeF;
        commulativeF +=
          (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
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
        setOld((prev) => [...prev, myObj]);
      }

      dataForPerformanceMeasures(ArrivalArray, ServiceArray);
    }
  }

  function dataForPerformanceMeasures(arrivals, serviceTimes) {
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
  }
  function utilizationCalculation(serverQty, testArray) {
    for (let i = 1; i <= serverQty; i++) {
      let serverData = testArray.filter((elem) => elem.server === i);
      let serviceSum = 0;
   
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
  }

  useEffect(() => {
    if (testArray.length > 0) {
      utilizationCalculation(serverQty, testArray);
     
    }
  }, [serverQty, testArray]);

  useEffect(() => {
    if (testArray.length > 0) {
      performanceTable();
    }
  }, [testArray]);

  const performanceTable = () => {
  
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

    const TableShow = ()=>{
  setShowTable(!showTable)
    }

  return (
    <div>
      <center>
        {" "}
        <h1>Random Number Simulation</h1>
      </center>
      <div className="perf">
      <label style={{width:"100%"}}>
      <h4>Mean (Interarrival) λ </h4>
        <input
          type="number"
          value={lambda}
          onChange={handleArrivalRateChange}
        />
      </label>
      <br />
      <label style={{width:"100%"}}>
      <h4 style={{paddingTop:"5px"}}>Mean (Service) µ </h4>
        <input type="number" value={meu} onChange={handleServiceRateChange}/>
      </label>
      <br />
      <label style={{width:"100%"}}>
        <h4>Number of servers:</h4>
        <input
          type="number"
          value={serverQty}
          onChange={handleNumServersChange}
        />
      </label>
      <br />
      <center><button onClick={runSimulation}>simulate</button></center>
      </div>
     {show && <center><button onClick={TableShow} style={{marginBottom:"10px"}}>Show Table</button></center>}
     {showTable && <div style={{width:'100%'}}>
      <center>{testArray.length ==0 && <h1>NO data to show</h1>}</center>
      <table style={{border:"1px solid black"}}>
                <thead >
                  <tr>
                    <th>CID</th>
                    <th>Arrival Time</th>
                    <th>Service Time</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Turnaround time</th>
                    <th>Response Time</th>
                    <th>Wait Time</th>
                    <th>Server</th>
                  </tr>
                </thead>
                <tbody>
                  {testArray.map((elem, key) => (
                    <tr key={key}>
                      <th>{elem.customerId}</th>
                      <th>{elem.arrivalTime}</th>
                      <th>{elem.serviceTime} </th>
                      <th>{elem.startTime}</th>
                      <th>{elem.endTime}</th>
                      <th>{elem.turnaroundTime}</th>
                      <th>{elem.responseTime}</th>
                      <th>{Math.abs(elem.waitTime)}</th>
                      <th>{elem.server}</th>
                    </tr>
                  ))}
                </tbody>
      </table>
      </div>
      }
      {performanceObj.length>0 &&  performanceObj.map((elem, key) => (
        <div key={key} className="perf">
          <center><h1 style={{fontWeight:"bolder",paddingBottom:"18px"}}>Performance Measures</h1></center>
          <p><span className="left"> Average Arrival </span><span className="right">{elem.avgArrival}</span></p>
          <br/>
          <p><span className="left">Average Service</span><span className="right">{elem.avgService}</span></p>
          <br/>
          <p><span className="left">Average response</span><span className="right">{elem.avgResponse}</span></p>
          <br/>
          <p><span className="left">Average Turn Around</span><span className="right">{elem.avgTurnAround}</span></p>
          <br/>
          <p><span className="left">Average Wait</span> <span className="right">{elem.avgWait}</span></p>
          <br/>
        </div>
      ))}

{serverUtilizations.length >0 && <center><h1>Server utilizations</h1></center>}
     
     {serverUtilizations.length >0 && serverUtilizations.map((elem, key) => (
      
       <div key={key} className="perf">
         <p>
           {" "}
           <span className="left">
           Utilization For Server{key + 1}
           </span>
            <span className="right"> {elem}</span><br/>
         </p>
       </div>
     )
     )
     }
     
    </div>
  );
}

export default RandomNumberSimulation;