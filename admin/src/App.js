import "./App.css";
import AdminPage from "./Component/Pages/AdminPage/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { SkeletonTheme } from 'react-loading-skeleton';
import InsertData from "./Component/Pages/InsertData/InsertData";
import Login from "./Component/Pages/LoginPages/Login.jsx"
import SignUp from "./Component/Pages/SIgnupPage/SignUp.jsx"

function App() {
  
  return (
    <BrowserRouter>
    <SkeletonTheme baseColor="#ded9d9" highlightColor="#bdbbbb" >
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/signUp" element={<SignUp/>} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/insert" element={<InsertData />} />
        </Routes>
      </div>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
