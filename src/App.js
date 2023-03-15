import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import PerformanceMeasures from "./pages/PerformanceMeasures";
import ChiSquareGoodnessOfFitTest from "./pages/ChiSquareGoodnessOfFitTest";
import RandomNumberSimulation from "./pages/RandomNumberSimulation";
// import RandomNum from "./pages/tes";
import Navbar from "./Components/Navbar";
import Home from "./Home";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="performance" element={<PerformanceMeasures />} />
           <Route path="chisquare" element={<ChiSquareGoodnessOfFitTest/>}/>
            <Route path="randomnumber" element={<RandomNumberSimulation/>}/>
            {/* <Route path="simulate" element={<RandomNum/>}/> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
