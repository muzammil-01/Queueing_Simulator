// import React, { useState,useEffect } from 'react';
// import data from "../data.json"
// // import factorial from 'factorial';

// const alpha=0.05

// function ChiSquareGoodnessOfFitTest() {
//   // Iterate through the object

//   // Initialize state variables
//   const [arrivalTimes, setArrivalTimes] = useState([]);
//   const [serviceTime, setServiceTime] = useState([]);
//   const [serverQty, setServerQty] = useState(1);
//   const [lambda, setLambda] = useState(2.65);
//   const [meu, setMeu] = useState(2.45);
//   const [testArray, settestArray] = useState([]);
//   const [performanceObj, setPerformanceObj] = useState([]);
//   const [CustomerNum, setCustomerNum] = useState(1);
//   const [serverUtilizations, setServerUtilizations] = useState([]);
//   const [show, setShow] = useState(false);

//   let F = 0;
//   let Arrival = 0;
//   let arr = [];
//   let ArrivalArray = [];
//   let ServiceArray = [];

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const factorial = (n) => {
//     if (n === 0) {
//       return 1;
//     } else {
//       return n * factorial(n - 1);
//     }
//   };

//   const [results, setResults] = useState(null);
//   let calculate=(e)=>
//   {
//     e.preventDefault()
//     for (const key in data) {
//     console.log(data);
//     if (data.hasOwnProperty(key)) {
//       // console.log(`${key}: ${data[key].Arrival}`);
//       arrivalTimes.push(data[key].Arrival)
//       serviceTime.push(data[key].Service)
//     }
//     setShow(true)
//   }}

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
// calculate(event)

//     // Step 1: Calculate the observed frequencies
//     const observedFrequencies = [];
//     for (let i = 0; i < serviceTime.length; i++) {
//       if (observedFrequencies[serviceTime[i]]) {
//         observedFrequencies[serviceTime[i]]++;
//       } else {
//         observedFrequencies[serviceTime[i]] = 1;
//       }
//     }
//     const obs = Object.values(observedFrequencies);
//     console.log("obs",Object.values(observedFrequencies));

//     // Step 2: Calculate the maximum likelihood estimate (MLE)
//     const mle = [];
//     let sumOfMle = 0;
//     let sumofobs=obs.reduce((partialSum, a) => partialSum + a, 0);

//     for (const [key, value] of Object.entries(observedFrequencies)) {
//      mle.push(key*value)
//      sumOfMle+=key*value
//     }
//     console.log(mle);
//    // for (let i = 0; i < obs.length; i++) {

//     //  const freq=obs[i]
//       // const arrivalTime = arrivalTimes[i];
//       // console.log(serviceTimes);
//     //  console.log(freq);

//       // if (mle[serviceTimes]) {
//       //   mle[serviceTimes] += serviceTimes * freq;
//       // } else {
//       //   mle[serviceTimes] = serviceTimes * freq;
//       // }

//     //}
// console.log(sumofobs);
// console.log(mle);
// console.log(sumOfMle);
//     // Step 3: Calculate lambda
//     const lambda = sumOfMle / sumofobs;
// console.log(lambda);
//     // Step 4: Calculate the probabilities
//     const probabilities = {};
//     for (let i in observedFrequencies) {
//       const x = parseInt(i);
//       console.log(x);
//       const e = Math.exp(-lambda);
//       const numerator = Math.pow(lambda, x);
//       const denominator = factorial(x);
//       probabilities[x] = ((e * numerator) / denominator);
//       console.log(e);
//     }
// for (const key in observedFrequencies) {
//   if (observedFrequencies.hasOwnProperty(key)) {
//     console.log(`${key}: ${observedFrequencies[key]}`);
//   }
// }

//     // Step 5: Calculate the expected frequencies
//     const expectedFrequencies = {};
//     let chiSquare = 0;
//     for (let i in observedFrequencies) {
//       const x = parseInt(i);
//       expectedFrequencies[x] = probabilities[x] * sumofobs ;
//       const observed = observedFrequencies[x];
//       const expected = expectedFrequencies[x];
//       chiSquare += (Math.pow((observed - expected), 2) / expected);
//     }
// if (chiSquare>alpha){
//   setShow(true)
// }
//     // Format results as an array of objects
//     const formattedResults = Object.keys(observedFrequencies).map((key,index) => ({

//       x: parseInt(key),
//       observed: observedFrequencies[key],
//       mle: mle[index],
//       probability: probabilities[key],
//       expected: expectedFrequencies[key],
//     }));

//     // Update state with results
//     setResults({
//       formattedResults,
//       chiSquare,
//     });
//     console.log(mle)
//   };

//   if (lambda > 0 && meu > 0) {
//     for (let i = 0; F <= 1; i++) {
//       let lookup =F;
//       F += (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
//       let No_between_Arrivals = i;
//       let Range = `${lookup} - ${F}`;
//       let InterArrival = Math.random();
//       Arrival += InterArrival;
//       let Service = -1 * meu * Math.log(Math.random());

//       ArrivalArray[i] = Arrival;
//       ServiceArray[i] = Service;

//       if (i == 0) {
//         InterArrival = 0;
//         Arrival = 0;
//       }
//       const myObj = {
//         F,
//         lookup,
//         No_between_Arrivals,
//         Range,
//         Arrival,
//         InterArrival,
//         Service,
//       };
//       arr[i] = myObj;
//     }
//     console.log(ArrivalArray);
//   }

//   const finalTableData = (arrivals, serviceTimes) => {
//     const servers = new Array(serverQty).fill(0);
//     arrivals.forEach((val, i) => {
//       let serverNum = 0;
//       for (let index = 0; index < servers.length; index++) {
//         if (servers[index] > servers[index + 1]) {
//           serverNum = index + 1;
//         }
//       }
//       let startTime;
//       if (arrivals[i] <= servers[serverNum]) {
//         startTime = servers[serverNum];
//       } else {
//         servers[serverNum] = arrivals[i];
//         startTime = arrivals[i];
//       }
//       let endTime = startTime + serviceTimes[i];
//       let arrival = arrivals[i];
//       let serviceTime = serviceTimes[i];
//       let turnaroundTime = endTime - arrival;
//       let waitTime = turnaroundTime - serviceTime;
//       let responseTime = startTime - arrival;

//       let obj = {
//         customerId: "C" + (i + 1),
//         arrivalTime: arrival,
//         serviceTime: serviceTimes[i],
//         server: serverNum + 1,
//         startTime,
//         endTime,
//         turnaroundTime,
//         waitTime,
//         responseTime,
//       };
//       servers[serverNum] += serviceTimes[i];
//       settestArray((prev) => [...prev, obj]);
//     });
//   };

//   const utilizationCalculation = (serverQty, testArray) => {
//     for (let i = 1; i <= serverQty; i++) {
//       console.log(testArray);
//       let serverData = testArray.filter((elem) => elem.server === i);
//       let serviceSum = 0;
//       if (serverData) {
//         console.log("server data", serverData);
//       }
//       serverData.forEach((elem) => {
//         serviceSum += elem.serviceTime;
//       });
//       console.log(serviceSum);
//       let totalTime = 0;
//       let endTimes = serverData.map((elem) => {
//         return elem.endTime;
//       });
//       console.log(endTimes);
//       totalTime = Math.max(...endTimes);
//       console.log(totalTime);

//       const utilization = serviceSum / totalTime / serverQty;
//       if (utilization !== 0) {
//         setServerUtilizations((prev) => [...prev, utilization]);
//       }
//     }
//   };

//   const performanceMeasures = () => {
//     console.log(testArray.length);
//     if (testArray.length > 0) {
//       let totalservicetime = testArray.reduce((accumulator, object) => {
//         return accumulator + object.serviceTime;
//       }, 0);
//       console.log(totalservicetime);

//       let totalarrivaltime = testArray.reduce((accumulator, object) => {
//         return accumulator + object.arrivalTime;
//       }, 0);
//       console.log(totalarrivaltime);

//       let totalTurnAround = testArray.reduce((accumulator, object) => {
//         return accumulator + object.turnaroundTime;
//       }, 0);
//       console.log(totalTurnAround);

//       let totalWait = testArray.reduce((accumulator, object) => {
//         return accumulator + object.waitTime;
//       }, 0);
//       console.log(totalWait);

//       let totalResponse = testArray.reduce((accumulator, object) => {
//         return accumulator + object.responseTime;
//       }, 0);
//       console.log(totalResponse);

//       let avgService = totalservicetime / testArray.length;
//       let avgArrival = totalarrivaltime / testArray.length;
//       let avgTurnAround = totalTurnAround / testArray.length;
//       let avgWait = totalWait / testArray.length;
//       let avgResponse = totalResponse / testArray.length;

//       console.log("avgService", avgService);
//       console.log("avgArrival", avgArrival);
//       console.log("avgTurnAround", avgTurnAround);
//       console.log("avgWait", avgWait);
//       console.log("avgResponse", avgResponse);

//       setPerformanceObj((prev) => [
//         ...prev,
//         {
//           avgService,
//           avgArrival,
//           avgTurnAround,
//           avgWait,
//           avgResponse,
//         },
//       ]);
//     } else {
//       //do nothing
//     }
//   };

//   return (
//     <>

//     <center>{show && <h1>Data follow poisson Distribution</h1>}</center>

//     <div>
//       <form onSubmit={handleSubmit}>
//     <br />
//     <center><button type="submit">Simulate</button></center>
//   </form>
//   <div>
//     {data.map((data)=>{
//       <li>{data.Customers}</li>
//     })}
//   </div>
//   {/* {results && (
//     <div>
//       <h2>Results</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>x</th>
//             <th>Observed Frequency</th>
//             <th>(MLE)</th>
//             <th>Probability</th>
//             <th>Expected Frequency</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.formattedResults.map((row) => (

//             <tr key={row.x}>
//               <td>{row.x}</td>
//               <td>{row.x}</td>
//               <td>{row.observed}</td>
//               <td>{row.mle}</td>
//               <td>{row.probability}</td>
//               <td>{row.expected}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p>Chi Square Value: {results.chiSquare}</p>
//     </div>
//   )} */}
// <center>
// <div style={{width:"100%"}}>
// {show &&  performanceObj.map((elem, key) => (
//         <div key={key} className="perf">
//           <h1>Performance Measures</h1>
//           <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Arrival </span><span style={{float:"right"}}>{elem.avgArrival}</span></p><br/>
//           <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Service</span><span style={{float:"right"}}>{elem.avgService}</span></p><br/>
//           <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average response</span><span style={{float:"right"}}>{elem.avgResponse}</span></p><br/>
//           <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Turn Around</span><span style={{float:"right"}}>{elem.avgTurnAround}</span></p><br/>
//           <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Wait </span><span style={{float:"right"}}>{elem.avgWait}</span></p>
//         </div>
//       ))}
//        {show && <h1>Server utilizations</h1>}

//       {show && serverUtilizations.map((elem, key) => (
//         <div key={key} className="perf">
//           <p>
//             <span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Utilization For Server {key + 1}</span> <span style={{float:"right"}}>{elem}</span><br/>
//           </p>
//         </div>
//       )
//       )
//       }
// </div>
//       </center>
// </div>
// </>);
// }

// export default ChiSquareGoodnessOfFitTest;

// ******************************izhan code********************************
// import React, { useState, useEffect, useRef } from "react";
// import "../Styles/styles.css";
// import { chiSqCalculation } from "../Functions_formulas/ChiSqHelperFormulas";

// function RandomNum() {
//   const [loading, setLoading] = useState(false);
//   const [calculatedData, setCalculatedData] = useState([]);
//   const [performanceObj, setPerformanceObj] = useState([]);
//   const [lambda, setLambda] = useState(2.65);
//   const [meu, setMeu] = useState(2.45);
//   const [CustomerNum, setCustomerNum] = useState(1);
//   const [serverUtilizations, setServerUtilizations] = useState([]);

//   const [serverQty, setServerQty] = useState(3);

//   const e = 2.718281828;

//   const initialRender = useRef(true);
//   const initialRenderPerformance = useRef(true);
//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false;
//     } else {
//       performanceMeasures();
//     }
//   }, [calculatedData]);

//   useEffect(() => {
//     if (initialRenderPerformance.current) {
//       initialRenderPerformance.current = false;
//     } else {
//       console.log("performance Data", performanceObj);
//     }
//   }, [performanceObj]);

//   function factorialize(num) {
//     var result = num;
//     if (num === 0 || num === 1) return 1;
//     while (num > 1) {
//       num--;
//       result *= num;
//     }
//     return result;
//   }

//   const cumulativeFrequencyValues = (lambda, x) => {
//     let lambdaNEG = lambda * -1;
//     // return (e ** (lambda * -1) * lambda ** x) / factorialize(x);
//     return (lambda ** x / factorialize(x)) * e ** lambdaNEG;
//   };

//   const serviceTimeValues = (meu) => {
//     let negMEU = meu * -1;
//     // return Math.floor(meu * -1 * Math.log(Math.random()));
//     return Math.floor(negMEU * Math.log(Math.random()));
//   };

//   const cumulativeFrequencyGenerate = () => {
//     let arr = [];

//     for (
//       let i = 0;
//       Number.parseFloat(arr[arr.length - 1]).toPrecision(7) !== "1.000000";
//       i++
//     ) {
//       if (i === 0) {
//         arr.push(cumulativeFrequencyValues(lambda, i));
//       } else {
//         // console.log(Number.parseFloat(arr[arr.length - 1]).toPrecision(7));
//         arr.push(cumulativeFrequencyValues(lambda, i) + arr[i - 1]);
//       }
//     }

//     console.log("cumulative frequencies ==>>", arr);
//     interArrivalColumn(arr);
//   };

//   const interArrivalColumn = (cumulativeArr) => {
//     let arr = [];

//     for (let i = 0; i < cumulativeArr.length; i++) {
//       if (i === 0) {
//         arr.push(0);
//       } else {
//         let rand = Math.random();
//         arr.push(
//           cumulativeArr.findIndex((value) => {
//             return rand - value < 0;
//           })
//         );
//       }
//     }
//     console.log("inter arrival ==>>", arr);
//     getInitialData(arr);
//   };

//   const getInitialData = (intArrivalArray) => {
//     let arrivalArr = [];
//     let serviceArr = [];

//     for (let i = 0; i < intArrivalArray.length; i++) {
//       if (i === 0) {
//         arrivalArr.push(intArrivalArray[i]);
//       } else {
//         arrivalArr.push(intArrivalArray[i] + arrivalArr[i - 1]);
//       }
//     }

//     // console.log("arrival array ==>>", arrivalArr);

//     for (let j = 0; j < intArrivalArray.length; j++) {
//       let serviceValue = serviceTimeValues(meu);
//       while (serviceValue === 0) {
//         serviceValue = serviceTimeValues(meu);
//       }
//       serviceArr.push(serviceValue);
//     }
//     // console.log("Service array ==>>", serviceArr);

//     // for (let k = 0; k < CustomerNum; k++) {
//     //     let obj = {
//     //         customerId: "C" + (k+1),
//     //         arrivalTime: arrivalArr[k],
//     //         serviceTime: serviceArr[k],
//     //         startTime: null,
//     //         endTime: null,
//     //         turnaroundTime: null,
//     //         waitTime: null,
//     //         responseTime: null
//     //     }
//     //     setInitialData((prev) => [...prev, obj])
//     // }
//     // if (isPossson) {
//     //   notifySuccess();
//     //   finalTableData(arrivalArr, serviceArr);
//     // } else {
//     //   notifyFailure();
//     // }
//     finalTableData(arrivalArr, serviceArr);
//   };

//   const finalTableData = (arrivals, serviceTimes) => {
//     const servers = new Array(serverQty).fill(0);
//     arrivals.forEach((val, i) => {
//       let serverNum = 0;
//       for (let index = 0; index < servers.length; index++) {
//         if (servers[index] > servers[index + 1]) {
//           serverNum = index + 1;
//         }
//       }
//       //let startTime = arrivals[i] < servers[serverNum] ? servers[serverNum] : arrivals[i];
//       let startTime;
//       if (arrivals[i] <= servers[serverNum]) {
//         startTime = servers[serverNum];
//       } else {
//         servers[serverNum] = arrivals[i];
//         startTime = arrivals[i];
//       }
//       let endTime = startTime + serviceTimes[i];
//       let arrival = arrivals[i];
//       let serviceTime = serviceTimes[i];
//       let turnaroundTime = endTime - arrival;
//       let waitTime = turnaroundTime - serviceTime;
//       let responseTime = startTime - arrival;
//       let obj = {
//         //interArrival: interArrivals[i],
//         customerId: "C" + (i + 1),
//         arrivalTime: arrival,
//         serviceTime: serviceTimes[i],
//         server: serverNum + 1,
//         startTime,
//         endTime,
//         turnaroundTime,
//         waitTime,
//         responseTime,
//       };
//       servers[serverNum] += serviceTimes[i];
//       setCalculatedData((prev) => [...prev, obj]);
//     });
//   };

//   const performanceMeasures = () => {
//     if (calculatedData.length > 0) {
//       let avgServiceTime =
//         calculatedData
//           .map((elem) => {
//             return elem.serviceTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) / calculatedData.length;
//       let avgArrivalTime =
//         calculatedData
//           .map((elem) => {
//             return elem.arrivalTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) / calculatedData.length;
//       let avgTurnaround =
//         calculatedData
//           .map((elem) => {
//             return elem.turnaroundTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) / calculatedData.length;
//       let avgWaitTime =
//         calculatedData
//           .map((elem) => {
//             return elem.waitTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) / calculatedData.length;
//       let avgWaitTimeWhoWait =
//         calculatedData
//           .map((elem) => {
//             return elem.waitTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) /
//         calculatedData.filter((elem) => elem.waitTime !== 0).length;
//       let avgResponseTime =
//         calculatedData
//           .map((elem) => {
//             return elem.responseTime;
//           })
//           .reduce((partialSum, a) => partialSum + a, 0) / calculatedData.length;

//       setPerformanceObj((prev) => [
//         ...prev,
//         {
//           avgArrivalTime,
//           avgServiceTime,
//           avgTurnaround,
//           avgWaitTime,
//           avgWaitTimeWhoWait,
//           avgResponseTime,
//           // server,
//         },
//       ]);

//       utilizationCalculation();
//     } else {
//       //do nothing
//     }
//   };

//   const utilizationCalculation = () => {
//     // let totalTime = 0;
//     // let endTimes = calculatedData.map((elem) => {
//     //   return elem.endTime;
//     // });

//     for (let i = 1; i <= serverQty; i++) {
//       let serverData = calculatedData.filter((elem) => elem.server === i);
//       let serviceSum = 0;

//       serverData.forEach((elem) => {
//         serviceSum += elem.serviceTime;
//       });

//       let totalTime = 0;
//       let endTimes = serverData.map((elem) => {
//         return elem.endTime;
//       });
//       totalTime = Math.max(...endTimes);

//       const utilization = serviceSum / totalTime / serverQty;

//       setServerUtilizations((prev) => [...prev, utilization]);
//     }
//   };
//   console.log("server utilization",serverUtilizations)

//   const calculate = () => {
//     setLoading(true);
//     //setInitialData([])
//     setServerUtilizations([]);
//     setCalculatedData([]);
//     setPerformanceObj([]);
//     cumulativeFrequencyGenerate();
//     setLoading(false);
//   };

//   const check = () => {
//     console.log(Math.random());
//   };

//   return (
//     <>
//     <button onClick={calculate}>calculate</button>
//     </>
//     // <div className="h-screen bg-gradient-to-bl from-[#21252B] to-[#2A323D] to-[#2D3C55]">
//     //   <div className="flex h-1/2">
//     //     <div className="flex border border-gray-600 m-3 rounded-lg flex-row flex-wrap text-white font-bold w-1/4 p-2 shadow-xl">
//     //       <h1 className="text-2xl font-bold text-center text-white justify-self-center w-full mt-3 -mb-5">
//     //         M/M/C Simulation
//     //       </h1>
//     //       <div className="flex justify-start items-center w-full">
//     //         <label className="pt-3">Enter Mean λ</label>
//     //         <input
//     //           className=" px-2 mt-2 ml-2 rounded-lg bg-white text-black focus:outline-none font-medium w-1/2"
//     //           placeholder="Enter Mean λ"
//     //           type="number"
//     //           onChange={(e) => {
//     //             setLambda(parseFloat(e.target.value));
//     //           }}
//     //         />
//     //       </div>
//     //       <div className="flex justify-start items-center w-full">
//     //         <label className="pt-3">Enter Mean μ</label>
//     //         <input
//     //           className=" px-2 mt-2 ml-2 rounded-lg bg-white text-black focus:outline-none font-medium w-1/2"
//     //           placeholder="Enter Mean μ"
//     //           type="number"
//     //           onChange={(e) => {
//     //             setMeu(parseFloat(e.target.value));
//     //           }}
//     //         />
//     //       </div>

//     //       {/* <label className='pt-3'>Number of Customers</label>
//     //                 <input
//     //                     className=' px-2 mt-2 rounded-lg bg-white text-black focus:outline-none font-medium'
//     //                     placeholder='Enter Number of Customers'
//     //                     type="number"
//     //                     defaultValue={1}
//     //                     onChange={(e) => { setCustomerNum(parseInt(e.target.value)) }}
//     //                 /> */}
//     //       <label className="pt-3">Number Of Servers </label>
//     //       <input
//     //         className=" px-2 mt-2 ml-3 rounded-lg bg-white text-black focus:outline-none font-medium h-10"
//     //         placeholder="Number of servers"
//     //         type="number"
//     //         defaultValue={1}
//     //         min={1}
//     //         onChange={(e) => {
//     //           setServerQty(parseInt(e.target.value));
//     //         }}
//     //       />
//     //       {loading ? (
//     //         <div className="rounded-md bg-[#2E71FF] text-white font-bold w-1/2 h-12 mt-2 mb-7 flex justify-center items-center">
//     //           <Oval
//     //             height={35}
//     //             width={35}
//     //             color="#fff"
//     //             wrapperStyle={{}}
//     //             wrapperClass=""
//     //             visible={true}
//     //             ariaLabel="oval-loading"
//     //             secondaryColor="#ddd"
//     //             strokeWidth={4}
//     //             strokeWidthSecondary={4}
//     //           />
//     //         </div>
//     //       ) : (
//     //         <>
//     //           <button
//     //             onClick={calculate}
//     //             className="rounded-md bg-[#2E71FF] text-white font-bold w-1/2 h-10 mt-5 mb-2 text-center text-lg"
//     //           >
//     //             CALCULATE
//     //           </button>
//     //         </>
//     //       )}
//     //     </div>
//     //     <div className="text-white border border-gray-600 grow overflow-y-auto m-3 scrollbar-hide rounded-lg shadow-xl">
//     //       {loading ? (
//     //         <div className="flex flex-col justify-center items-center h-full">
//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : calculatedData.length === 0 ? (
//     //         <div className="flex flex-col justify-center items-center h-full">
//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : (
//     //         <div className="relative overflow-x-auto drop-shadow-xl sm:rounded-lg">
//     //           <table className="w-full text-sm text-left text-gray-400">
//     //             <caption className="p-3 text-lg font-semibold text-left text-white bg-gray-800">
//     //               Tabular Form
//     //             </caption>
//     //             <thead className="text-xs uppercase bg-gray-700 text-gray-400">
//     //               <tr>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   CID
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Arrival Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Service Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Start Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   End Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Turnaround time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Response Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Wait Time
//     //                 </th>
//     //                 <th scope="col" className="px-3 py-3">
//     //                   Server Assigned
//     //                 </th>
//     //               </tr>
//     //             </thead>
//     //             <tbody>
//     //               {calculatedData.map((elem, key) => (
//     //                 <tr
//     //                   className="border-b bg-gray-800 border-gray-700"
//     //                   key={key}
//     //                 >
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white"
//     //                   >
//     //                     {elem.customerId}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.arrivalTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.serviceTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.startTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.endTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.turnaroundTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.responseTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem.waitTime}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     S{elem.server}
//     //                   </th>
//     //                 </tr>
//     //               ))}
//     //             </tbody>
//     //           </table>
//     //         </div>
//     //       )}
//     //     </div>
//     //   </div>
//     //   <div className="flex h-1/2">
//     //     <div className="flex border border-gray-600 mt-1.5 mb-3 mx-3 rounded-lg flex-row flex-wrap text-white text-lg font-bold w-3/5 p-2 shadow-xl">
//     //       {loading ? (
//     //         <div className="flex flex-col justify-center items-center h-full">

//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : calculatedData.length === 0 ? (
//     //         <div className="flex flex-col justify-center items-center h-full">

//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : (

//     //       )}
//     //     </div>
//     //     <div className="text-white border border-gray-600 grow overflow-y-auto m-3 scrollbar-hide rounded-lg shadow-xl">
//     //       {loading ? (
//     //         <div className="flex flex-col justify-center items-center h-full">

//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : performanceObj.length === 0 ? (
//     //         <div className="flex flex-col justify-center items-center h-full">

//     //           <h2 className="text-xl py-3.5 pl-4 font-semibold">
//     //             No Data To Display!
//     //           </h2>
//     //         </div>
//     //       ) : (
//     //         <div className="relative overflow-x-auto drop-shadow-xl sm:rounded-lg">
//     //           {performanceObj.map((elem, key) => (
//     //             <table className="w-full text-sm text-left text-gray-400">
//     //               <caption className="p-3 text-lg font-semibold text-left text-white bg-gray-800">
//     //                 {/* Performance Measure for Server {elem.server} */}
//     //                 Performance Measures
//     //               </caption>
//     //               <thead className="text-xs uppercase bg-gray-700 text-gray-400">
//     //                 <tr>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Arrival
//     //                   </th>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Service
//     //                   </th>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Turnaround
//     //                   </th>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Wait Time
//     //                   </th>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Wait Time for Who Wait
//     //                   </th>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Avg Response
//     //                   </th>
//     //                 </tr>
//     //               </thead>
//     //               <tbody>
//     //                 <tr
//     //                   className="border-b bg-gray-800 border-gray-700"
//     //                   key={key}
//     //                 >
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(Math.round(elem.avgArrivalTime * 100) / 100).toFixed(
//     //                       3
//     //                     )}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(Math.round(elem.avgServiceTime * 100) / 100).toFixed(
//     //                       3
//     //                     )}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(Math.round(elem.avgTurnaround * 100) / 100).toFixed(
//     //                       3
//     //                     )}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(Math.round(elem.avgWaitTime * 100) / 100).toFixed(3)}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(
//     //                       Math.round(elem.avgWaitTimeWhoWait * 100) / 100
//     //                     ).toFixed(3)}
//     //                   </th>
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {(Math.round(elem.avgResponseTime * 100) / 100).toFixed(
//     //                       3
//     //                     )}
//     //                   </th>
//     //                 </tr>
//     //               </tbody>
//     //             </table>
//     //           ))}
//     //           {serverUtilizations.map((elem, index) => (
//     //             <table
//     //               key={index}
//     //               className="w-full text-sm text-left text-gray-400"
//     //             >
//     //               <caption className="p-3 text-lg font-semibold text-left text-white bg-gray-800">
//     //                 Utilization For Server {index + 1}
//     //               </caption>
//     //               <thead className="text-xs uppercase bg-gray-700 text-gray-400">
//     //                 <tr>
//     //                   <th scope="col" className="px-3 py-3">
//     //                     Server Utilization
//     //                   </th>
//     //                 </tr>
//     //               </thead>
//     //               <tbody>
//     //                 <tr
//     //                   className="border-b bg-gray-800 border-gray-700"
//     //                   key={index}
//     //                 >
//     //                   <th
//     //                     scope="row"
//     //                     className="px-3 py-4 font-medium text-white text-center"
//     //                   >
//     //                     {elem}
//     //                   </th>
//     //                 </tr>
//     //               </tbody>
//     //             </table>
//     //           ))}
//     //         </div>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//   )
// }

// export default RandomNum;

import React, { useState, useEffect, useRef } from "react";
import factorial from "factorial";
function RandomNum() {
  const [serverQty, setServerQty] = useState(0);
  const [lambda, setLambda] = useState(0);
  const [meu, setMeu] = useState(0);
  const [testArray, settestArray] = useState([]);
  const [old, setOld] = useState([]);
  const [performanceObj, setPerformanceObj] = useState([]);
  const [serverUtilizations, setServerUtilizations] = useState([]);
  const [showTable, setShowTable] = useState(true)

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
      console.log(ArrivalArray);
      console.log(ServiceArray);
      finalTableData(ArrivalArray, ServiceArray);
    }
  }
  if (old.length > 0) {
    console.log("old", old);
  }

  function finalTableData(arrivals, serviceTimes) {
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
  }

  useEffect(() => {
    if (testArray.length > 0) {
      utilizationCalculation(serverQty, testArray);
      console.log(testArray);
    }
  }, [serverQty, testArray]);

  useEffect(() => {
    if (testArray.length > 0) {
      performanceMeasures();
    }
  }, [testArray]);

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

  if (performanceObj.length > 0) {
    console.log("performance measures", performanceObj);
  }

    const TableShow = ()=>{
  setShowTable(!showTable)
    }

  return (
    <div>
      <center>
        {" "}
        <h1>Random Number Simulation</h1>
      </center>
      <div  style={{ width: "50%" ,margin:"0 auto"}}>
      <label>
        Service rate:
        <input type="number" value={meu} onChange={handleServiceRateChange} />
      </label>
      <br />
      <label>
        Arrival rate:
        <input
          type="number"
          value={lambda}
          onChange={handleArrivalRateChange}
        />
      </label>
      <br />
      <label>
        Number of servers:
        <input
          type="number"
          value={serverQty}
          onChange={handleNumServersChange}
        />
      </label>
      <br />
      <button onClick={runSimulation}>simulate</button>
      </div>
      <button onClick={TableShow}>Show Table</button>
      {performanceObj.length>0 &&  performanceObj.map((elem, key) => (
        <div key={key} className="perf">
          <h1>Performance Measures</h1>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}> Average Arrival </span><span style={{float:"right"}}>{elem.avgArrival}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Service</span><span style={{float:"right"}}>{elem.avgService}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average response</span><span style={{float:"right"}}>{elem.avgResponse}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Turn Around</span><span style={{float:"right"}}>{elem.avgTurnAround}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Wait</span> <span style={{float:"right"}}>{elem.avgWait}</span></p>
          <br/>
        </div>
      ))}

{serverUtilizations.length >0 && <h1>Server utilizations</h1>}
     
     {serverUtilizations.length >0 && serverUtilizations.map((elem, key) => (
       <div key={key} className="perf">
         <p>
           {" "}
           <span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>
           Utilization For Server{key + 1}
           </span>
            <span style={{float:"right"}}> {elem}</span><br/>
         </p>
       </div>
     )
     )
     }

      
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
                      <th>{elem.waitTime}</th>
                      <th> S{elem.server}</th>
                    </tr>
                  ))}
                </tbody>
      </table>
      </div>}





      {/* {show && <center><button onClick={TableShow} style={{width:"15%"}}>show table</button></center>}
   <center>
    <div style={{width:"70%"}}>
     {show &&  performanceObj.map((elem, key) => (
        <div key={key} className="perf">
          <h1>Performance Measures</h1>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}> Average Arrival </span><span style={{float:"right"}}>{elem.avgArrival}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Service</span><span style={{float:"right"}}>{elem.avgService}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average response</span><span style={{float:"right"}}>{elem.avgResponse}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Turn Around</span><span style={{float:"right"}}>{elem.avgTurnAround}</span></p>
          <br/>
          <p><span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>Average Wait</span> <span style={{float:"right"}}>{elem.avgWait}</span></p>
          <br/>
        </div>
      ))}
      
        {" "}
       {show && <h1>Server utilizations</h1>}
     
      {show && serverUtilizations.map((elem, key) => (
        <div key={key} className="perf">
          <p>
            {" "}
            <span style={{fontWeight:"bolder",marginRight:"15px",float:"left"}}>
            Utilization For Server{key + 1}
            </span>
             <span style={{float:"right"}}> {elem}</span><br/>
          </p>
        </div>
      )
      )
      }
      </div>
      </center>
     
     {showTable && <div style={{width:'100%'}}>
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
                      <th>{elem.waitTime}</th>
                    </tr>
                  ))}
                </tbody>
      </table>
      </div>} */}
    </div>
  );
}

export default RandomNum;
