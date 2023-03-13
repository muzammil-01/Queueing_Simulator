import React from "react";
import { useState } from "react";
import factorial from "factorial";
import { useNavigate, createSearchParams} from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [lambda, setLambda] = useState(0); //mean interarival
  const [meu, setMeu] = useState(0); //mean service
  const [server, setServer] = useState(1);
  const [numberOfMultiservers,setNumberOfMultiservers ] = useState(0)
  const [distributionArrivalTime, setdistributionArrivalTime] = useState("");
  const [distributionServiceTIme, setDistributionServiceTIme] = useState("");
  const [queueType, setQueueType] = useState("");
  const [error, setError] = useState()
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [varianceAT, setVarianceAT] = useState();
  const [varianceST, setVarianceST] = useState();
  const [userVarinace, setuserVarinace] = useState()
  const [ showMeu, setShowMeu ] = useState(true)
  const [ showMinMax, setShowMinMax ] = useState(false)
  console.log("this is meu",showMeu, showMinMax)

  var averageTimeOfCustomerInQueue;
  var averageTimeOfCustomerInSystem;
  var averageNumberOfCustomerInSystem;
  var idle;
  console.log(queueType)
  

//****************************************   Single Server Function ************************************************************

  function SingleServerQueue( lambda, meu, max = 0, min = 0, varianceST = 0,varianceAT = 0) 
  {
    //******************************************** M/M/1 ********************************************* */
    if (distributionArrivalTime === "Exponential" && distributionServiceTIme === "Exponential") 
    {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        meu = 1 / meu;
      } else {
        meu = 1 / meu;
      }
      lambda = 1 / lambda;

      //utilization time
      var p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var lengthOfQueue = Math.pow(p, 2) / (1 - p);
      PerformanceMeasures(lengthOfQueue, p, lambda, meu);
    } 


    else if ( distributionArrivalTime === "Poisson" && distributionServiceTIme === "Exponential") 
    {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        meu = 1 / meu;
      } else {
        meu = 1 / meu;
      }
      lambda = 1 / lambda;
      var p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var lengthOfQueue = (lambda * lambda) / (meu * (meu - lambda));
      PerformanceMeasures(lengthOfQueue, p,lambda,meu);
    } 


    /*######################### m/g/1  ####################################*/
    else if ( (distributionArrivalTime === "Exponential" || distributionArrivalTime === "Poisson") && distributionServiceTIme === "Normal" ) 
    {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        var variance = Math.pow(parseInt(max) - parseInt(min), 2) / 12;
        meu = 1 / meu;
      } else {
        meu = 1 / meu;
        variance = 1
      }
      lambda = 1 / lambda;
      p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var lengthOfQueue = (lambda * lambda * variance + p * p) / (2 * (1 - p));
      PerformanceMeasures(lengthOfQueue, p, lambda, meu);
    } 
    else if ( (distributionArrivalTime === "Exponential" || distributionArrivalTime === "Poisson") && distributionServiceTIme === "Uniform" ) 
    {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        var variance = Math.pow(parseInt(max) - parseInt(min), 2) / 12;
        meu = 1 / meu;
      } else {
        meu = 1 / meu;
        variance = userVarinace
      }
      lambda = 1 / lambda;
      p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var lengthOfQueue = (lambda * lambda * variance + p * p) / (2 * (1 - p));
      PerformanceMeasures(lengthOfQueue, p, lambda, meu);
    } else if ( (distributionArrivalTime === "Exponential" || distributionArrivalTime === "Poisson") &&
      distributionServiceTIme === "Gamma"
    ) {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        var variance = Math.pow(parseInt(max) - parseInt(min), 2) / 12;
        meu = 1 / meu;
      } else {
        meu = 1 / meu;
        variance = userVarinace
      }
      lambda = 1 / lambda;
      p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var lengthOfQueue = (lambda * lambda * variance + p * p) / (2 * (1 - p));
      PerformanceMeasures(lengthOfQueue, p, lambda, meu);
    } 
    //******************************************** G/G/1 ********************************************* */
    else if (
      (distributionArrivalTime === "Gamma" && distributionServiceTIme === "Normal") ||
      (distributionArrivalTime === "Gamma" && distributionServiceTIme === "Gamma") ||
      (distributionArrivalTime === "Gamma" &&  distributionServiceTIme === "Uniform")
    ) 
    {
      if (max !== 0 && min !== 0) {
        meu = (parseInt(max) + parseInt(min)) / 2;
        var varianceMinMax = Math.pow(max - min, 2) / 12;
        meu = 1 / meu;
      }else{
        meu = 1/meu
      }
      lambda = 1/lambda
      p = lambda / meu;
      if(p > 1){
        alert("please try other values")
        window.location.reload()
      }
      var ca = varianceAT / Math.pow(1 / lambda, 2); //coefficientOfArrivalTime
      if(varianceMinMax){
        var cs = varianceMinMax / Math.pow(1 / meu, 2); //coefficientOfServiceTime
      }
      else{
        var cs = varianceST / Math.pow(1 / meu, 2); //coefficientOfServiceTime
      }
      var lengthOfQueue =
        (p * p * (1 + cs) * (ca + p * p * cs)) /
        (2 * (1 - p) * (1 + p * p * cs));
      PerformanceMeasures(lengthOfQueue, p,lambda,meu);
    } else {
      alert("Please Select Proper Distributions")
      setError()
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

//******************************************** multi server function ********************************************* */
  function MultiServerQueue(lambda, meu, max = 0, min = 0, ca = 0, cs = 0) 
  {
    switch (queueType) {
      case "M/M/C":
      case "M/G/C":
        if (max !== 0 && min !== 0) {
          meu = (parseInt(max) + parseInt(min)) / 2;
          meu = 1 / meu;
        } else {
          meu = 1 / meu;
        }
        lambda = 1 / lambda;
        var p = lambda / (meu * numberOfMultiservers);
        if(p > 1){
          alert("please try other values")
          window.location.reload()
        }
        var summation = SummationCalcutation(numberOfMultiservers,p)
        console.log("summation",summation)
        var fact = factorial(numberOfMultiservers)

        var Po = 1/((summation) + ((Math.pow((numberOfMultiservers * p)), numberOfMultiservers) / (fact * (1-p))))
        console.log("Po",Po)

        var lengthOfQueue = (Po * Math.pow(lambda / meu, numberOfMultiservers) * p) / (fact * Math.pow(1 - p, 2));


        averageTimeOfCustomerInQueue = lengthOfQueue / lambda; // wq
        averageTimeOfCustomerInSystem = averageTimeOfCustomerInQueue + 1 / meu; //w
        averageNumberOfCustomerInSystem =lambda * averageTimeOfCustomerInSystem; //L
        idle = 1 - p;
        var utilization = p
        navigate({
          pathname:"/performance",
          search: createSearchParams({
            w: averageTimeOfCustomerInSystem, //w
            wq:averageTimeOfCustomerInQueue, //wq,
            l:averageNumberOfCustomerInSystem, //L
            lq: lengthOfQueue,
            idletime: idle,
            p:utilization,
            Po
          }).toString()
        })

        break;

      case "G/G/C":
        if (max !== 0 && min !== 0) {
          meu = (parseInt(max) + parseInt(min)) / 2;
          meu = 1 / meu;
          var varianceMinMax = Math.pow(max - min, 2) / 12;
        }
        else{
          meu = 1/meu;
        
        }
        lambda = 1 / lambda;
        var p = lambda / (meu * numberOfMultiservers);
        if(p > 1){
          alert("please try other values")
          window.location.reload()
        }
        var summation = SummationCalcutation(numberOfMultiservers,p)
        console.log("summation",summation)
        var fact = factorial(numberOfMultiservers)

        var Po = 1/((summation) + ((Math.pow((numberOfMultiservers * p)), numberOfMultiservers) / (fact * (1-p))))
        console.log("Po",Po)

        var lengthOfQueue = (Po * Math.pow(lambda / meu, numberOfMultiservers) * p) / (fact * Math.pow(1 - p, 2));
        var averageTimeOfCustomerInQueue = lengthOfQueue / lambda;
        //Wq for G/G/C
    
        var ca = varianceAT / (1 / (lambda*lambda)); //coefficientOfArrivalTime
        if(varianceMinMax){
          var cs = varianceMinMax / Math.pow(1 / meu, 2); //coefficientOfServiceTime
        }
        else{
          var cs = varianceST / Math.pow(1 / meu, 2); //coefficientOfServiceTime
        }
        var averageTimeOfCustomerInQueue_GGC =
          averageTimeOfCustomerInQueue * ((ca + cs) / 2);
        var lengthOfQueue_GGC = averageTimeOfCustomerInQueue_GGC * lambda;
        var averageTimeOfCustomerInSystem_GGC =
          averageTimeOfCustomerInQueue_GGC + 1 / meu; //w
        var averageNumberOfCustomerInSystem_GGC =
          lambda * averageTimeOfCustomerInSystem_GGC; //L
          idle = 1-p;
          var utilization = p
        navigate({
          pathname:"/performance",
          search: createSearchParams({
            w: averageTimeOfCustomerInSystem_GGC, //w
            wq:averageTimeOfCustomerInQueue_GGC, //wq,
            l:averageNumberOfCustomerInSystem_GGC, //L
            lq: lengthOfQueue_GGC,
            idletime: idle,
            p:utilization,
            Po
          }).toString()
        })

        break;

      default:
        break;
    }
  }
  function SummationCalcutation(c, p){
     sc = 0;
     for(var m = 0 ; m<c ;m++) {
       var sc = sc + Math.pow((c*p),m) / factorial(m)
       console.log(sc)
     }
     return sc
   }



//******************************************** Performance measures function ********************************************* */
  function PerformanceMeasures(lengthOfQueue, p, lambda, meu) {
     averageTimeOfCustomerInQueue = lengthOfQueue / lambda; // wq
     averageTimeOfCustomerInSystem = averageTimeOfCustomerInQueue + 1 / meu; //w
     averageNumberOfCustomerInSystem =lambda * averageTimeOfCustomerInSystem; //L
     idle = 1 - p;
     var utilization = p

  navigate({
    pathname:"/performance",
    search: createSearchParams({
      w: averageTimeOfCustomerInSystem, //w
      wq:averageTimeOfCustomerInQueue, //wq,
      l:averageNumberOfCustomerInSystem, //L
      lq: lengthOfQueue,
      idletime: idle,
      p:utilization
    }).toString()
  })

  }

  return (
    <>
       
      {error && <p className="error">{error}</p>}
      <h1 style={{textAlign:"center"}}>BANK QUEUEING SIMULATOR</h1>
      <div className="container">
      
        {/* **************************************************   Select Servers    ****************************************************/}
        <div className="servers">
          <center>
          <select className="slct" name="servers" id="servers" onChange={(e) => setServer(e.target.value)}>
          <option value="1">Single Server</option>
          <option value="2">Multi Server</option>
          </select>
          </center>
        </div>

            {/* ******************************************** Single Server User Interface ****************************************************/}
        {server == 1 && (
          <form onSubmit={() => SingleServerQueue( lambda, meu, max, min, varianceST, varianceAT)}>
          <div className="times" >
            {/* ********************************************distribution Arrival time ****************************************************/}
            <div className="servicearrival">
              <div className="arrivalTime">
                <h3>Distribution Arrival Time:</h3>

                <input type="radio" id="poisson" name="arrival_time" value="Poisson" onChange={(e) => setdistributionArrivalTime(e.target.value)}/>
                <label htmlFor="poisson">Poisson</label>
                <br />

                <input type="radio" id="exponential" name="arrival_time" value="Exponential" onChange={(e) => setdistributionArrivalTime(e.target.value)}/>
                <label htmlFor="exponential">Exponential</label>
                <br />

                <input type="radio" id="gamma" name="arrival_time" value="Gamma" onChange={(e) => setdistributionArrivalTime(e.target.value)}/>
                <label htmlFor="gamma">Gamma</label>
                <br />
              </div>

              {/* ********************************************distribution service time ****************************************************/}
              <div className="serviceTime">
                <h3>Distribution Service Time:</h3>

                <input type="radio" id="uniform" name="service_time" value="Uniform" onChange={(e) => setDistributionServiceTIme(e.target.value)}/>
                <label htmlFor="uniform">Uniform</label>
                <br />

                <input type="radio" id="exp" name="service_time" value="Exponential" onChange={(e) => setDistributionServiceTIme(e.target.value)}/>
                <label htmlFor="exp">Exponential</label>
                <br />

                <input type="radio" id="gamm" name="service_time" value="Gamma" onChange={(e) => setDistributionServiceTIme(e.target.value)}/>
                <label htmlFor="gamm">Gamma</label>
                <br />

                <input type="radio" id="normal" name="service_time" value="Normal" onChange={(e) => setDistributionServiceTIme(e.target.value)}/>
                <label htmlFor="normal">Normal</label>
              </div>
            </div>


            {/*********************** Show Meu Or Min Max *************************************/}


            <div className="servers">
          <center>
          <select className="slct" name="use" id="use" onChange={(e) => {
            if(e.target.value === `Meu`){
            setShowMeu(true)
            setShowMinMax(false)
          }
          if(e.target.value === `MinMax`){
            setShowMinMax(true)
            setShowMeu(false)
          }
          }}>
          <option value="Meu">Use Meu</option>
          <option value="MinMax">Use Min Max</option>
          </select>
          </center>
        </div>

            

         {/* ********************************************MEAN SERVICE AND INTERARRIVAL ****************************************************/}
           <div className="means">
              <div className="meanInterArrival">
              <h4>Mean (Interarrival) λ</h4>
              <input type="number" placeholder="please insert value in minutes" onChange={(e) => setLambda(e.target.value)}min={0} required/>
              </div>

            {showMeu && (
              <div className="meanService">
              <h4>Mean (Service) µ </h4>
              <input disabled={max} type="number" placeholder="please insert value in minutes" onChange={(e) => setMeu(e.target.value)} min={0} required/>
              </div>
                )}
                </div>
           

        {/* ********************************************Minimum and maximum ****************************************************/}
            {showMinMax && (

              <div className="minmax">
              <div>
              <h4>Enter Max</h4>
              <input type="number" placeholder="please insert value in minutes" onChange={(e) => setMax(e.target.value)} disabled={meu}  min={0} required/>
              </div>

              <div className="min">
              <h4>Enter Min</h4>
              <input type="number" placeholder="please insert value in minutes" onChange={(e) => setMin(e.target.value)} disabled={meu} min={0} required/>
              </div>
            </div>
              )}

   {/* ******************************************** Variance of Service and  Arrival time ****************************************************/}
            {(
            (distributionArrivalTime === "Gamma" && distributionServiceTIme === "Gamma")  || 
            (distributionArrivalTime === "Gamma" && distributionServiceTIme === "Normal") || 
            (distributionArrivalTime === "Gamma" && distributionServiceTIme === "Uniform"))  
            && (
              <div className="variances">
              <div>
              <h4>Variance Arrival Time σ2</h4>
              <input type="number" placeholder="please insert value in minutes" onChange={(e) => setVarianceAT(e.target.value)} min={0} required/>
              </div>

              <div className="varianceservice">
              <h4>Variance Service Time σ2</h4>
              <input type="number"min={0} placeholder="please insert value in minutes" onChange={(e) => setVarianceST(e.target.value)} disabled={max} required/>
              </div>

              </div>
              )}
          </div>
          <center>
            {
              <button className="calculate">
                Calculate
              </button>
            }
          </center>
          </form>
        )}


           {/* ******************************************** Multi Server User Interface ****************************************************/}
        {server == 2 && (
          <form onSubmit={() => MultiServerQueue( lambda, meu, max, min, varianceST, varianceAT)}>
          <div className="servers2" >
             {/* ******************************************** Number of servers input ****************************************************/}
             <center>

             <div className="NoOfServers">
            <input type="number" placeholder="Enter number of server" onChange={(e)=>setNumberOfMultiservers(e.target.value)} min={2} required/>
             </div>
             </center>
            <h3 style={{textAlign:"center"}}>Select Queue type</h3>


             {/* ******************************************** Select Queue Types  ****************************************************/}
            <div className="queuetypes">
            <div>
            <input type="radio" id="poisson" name="arrival_time" value="M/M/C" onChange={(e) => setQueueType(e.target.value)} />
            <label htmlFor="M/M/C">M/M/C</label>
            </div>

            <div>
            <input type="radio" id="poisson" name="arrival_time" value="M/G/C" onChange={(e) => setQueueType(e.target.value)} />
            <label htmlFor="M/G/C">M/G/C</label>
            </div>

            <div>
            <input type="radio" id="poisson" name="arrival_time" value="G/G/C" onChange={(e) => setQueueType(e.target.value)} />
            <label htmlFor="G/G/C">G/G/C</label>
            </div>
            </div>

            {/* ******************************************** MEAN SERVICE AND INTERARRIVAL ****************************************************/}
            
            <div className="MeuMinMax">
          <center>
          <select className="slct" name="use" id="use" onChange={(e) => {
            if(e.target.value === `Meu`){
            setShowMeu(true)
            setShowMinMax(false)
          }
          if(e.target.value === `MinMax`){
            setShowMinMax(true)
            setShowMeu(false)
          }
          }}>
          <option value="Meu">Use Meu</option>
          <option value="MinMax">Use Min Max</option>
          </select>
          </center>
        </div>

            <div>
             

            <div className="means">
            <div className="meanInterArrival">
            <h4>Mean (Interarrival) λ</h4>
            <input type="number" placeholder="please insert value in minutes" onChange={(e) => setLambda(e.target.value)} min={0} required/>
            </div>
         


           
            {showMeu && (
            <div className="meanService">
            <h4>Mean (Service) µ</h4>
            <input type="number" placeholder="please insert value in minutes" onChange={(e) => setMeu(e.target.value)} disabled={max} min={0} required/>
            </div>
            )}
            </div>
            </div>

             

            {/* ******************************************** Minimum and maximum ****************************************************/}
            {showMinMax && (

            <div className="minmax">
            <div className="max">
            <h4>Enter Max</h4>
            <input type="number" placeholder="please insert value in minutes" onChange={(e) => setMax(e.target.value)}  disabled={meu} min={0} required/>
            </div>

            <div className="min" >
            <h4>Enter Min</h4>
            <input type="number" placeholder="please insert value in minutes" onChange={(e) => setMin(e.target.value)} disabled={meu} min={0} required/>
            </div>
            </div>
              )}

            {/* ******************************************** Variance of service and arrival time ****************************************************/}
            {queueType == "G/G/C" && (
            <div className="variances">
            <div>
            <h4>variance of Arrival time σ2</h4>
            <input type="number" name="arrival_time" placeholder="please insert value in minutes" onChange={(e) => setVarianceAT(e.target.value)}min={0}required/>
            </div>


               <div className="meanService">
            <h4>variance of Service time σ2</h4>
            <input type="number" name="arrival_time" placeholder="please insert value in minutes" onChange={(e) => setVarianceST(e.target.value)} disabled={max} min={0} required/>
            </div>
            </div>
            )}
          </div>
          <center>
            {
              <button className="calculate">
                Calculate
              </button>
            }
          </center>
          </form>
        )}

      </div>
    </>
  );
}