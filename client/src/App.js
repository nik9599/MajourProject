
import "./App.css";
import Cart from "./Component/Pages/CartPage/Cart";
import Landing from "./Component/Pages/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Component/Pages/SIgnupPage/SignUp";
import Login from "./Component/Pages/LoginPages/Login";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/cart" element={<Cart  />} />
          <Route exact path="/signUp" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
