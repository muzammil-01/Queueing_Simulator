import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import PerformanceMeasures from "./pages/PerformanceMeasures";
import ChiSquareGoodnessOfFitTest from "./pages/ChiSquareGoodnessOfFitTest";
import RandomNumberSimulation from "./pages/RandomNumberSimulation";
import ChiSquareTable from "./pages/tes";
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
            <Route path="chichi" element={<ChiSquareTable     arrivalTime1={[0, 1, 2, 3, 4]}
  serviceTime1={[5, 7, 9, 12, 14]}  />} 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
