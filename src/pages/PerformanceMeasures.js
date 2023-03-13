import React from "react";
import { useSearchParams,Link } from "react-router-dom";

export default function PerformanceMeasures({w}) {
  
const [searchparams] = useSearchParams();
console.log()
  return (
    <>
    <h1 style={{textAlign:"center", marginBottom:"0px"}}>Performance Measures</h1>
    <div className="performanceMeasures">
        <h2 className="heading">Wq <p style={{fontSize:"12px", display:"inline"}}>(Average time of customer in queue)</p>  <span className="spn">{parseFloat(searchparams.get("wq")).toFixed(4)}</span> </h2>
        <h2 className="heading">W <p style={{fontSize:"12px", display:"inline"}}>(Average time of customer in system)</p>   <span className="spn">{parseFloat(searchparams.get("w")).toFixed(4)}</span> </h2>
        <h2 className="heading">L <p style={{fontSize:"12px", display:"inline"}}>(Average number of customer in system)</p>   <span className="spn">{parseFloat(searchparams.get("l")).toFixed(4)}</span> </h2>
        <h2 className="heading">Lq  <p style={{fontSize:"12px", display:"inline"}}>(Average number of customer in queue)</p> <span className="spn">{parseFloat(searchparams.get("lq")).toFixed(4)}</span> </h2>
        <h2 className="heading">P  <p style={{fontSize:"12px", display:"inline"}}>(Utilization factor)</p> <span className="spn">{(parseFloat(searchparams.get("p"))*100).toFixed(0)+"%"}</span> </h2>
        <h2 className="heading">IdleTime <span className="spn"> {(parseFloat(searchparams.get("idletime"))*100).toFixed(0)+"%"}</span> </h2>
        {searchparams.get("Po") && 
        <h2 className="heading">Po <p style={{fontSize:"12px", display:"inline"}}>(Probability of zero customers in system)</p> <span className="spn">{(parseFloat(searchparams.get("Po"))*100).toFixed(0)+"%"}</span></h2>}
    </div>
    <center><Link to="/" style={{textDecoration:"none",color:"black",fontWeight:"bolder", backgroundColor:"lightgray", padding:"8px",borderRadius:"10px",border:"1px solid gray"}}> Go Back </Link></center>
    </>
  );
}
