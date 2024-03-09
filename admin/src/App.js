import "./App.css";
import AdminPage from "./Component/Pages/AdminPage/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Component/Pages/CartPage/Cart.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/admin" element={<AdminPage />} />
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
