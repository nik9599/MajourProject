import "./App.css";
import Cart from "./Component/Pages/CartPage/Cart";
import Landing from "./Component/Pages/LandingPage/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/cart" element={<Cart/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
