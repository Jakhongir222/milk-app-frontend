import './App.css';
import MilkProducts from './components/MilkProducts';
import MilkDetails from './components/MilkDetails';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <header>
       <div className='header'>THE MILK STORE</div>
      </header>
    <BrowserRouter>
      <Routes>
        <Route path='/milk' element={<MilkProducts />}  />
        <Route path='/milk/:id' element={<MilkDetails />}  />
      </Routes>
    </BrowserRouter>
    </div>
  );
}



export default App;
