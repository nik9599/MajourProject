import "./App.css";
import AdminPage from "./Component/Pages/AdminPage/AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


function App() {
  
  return (
    <BrowserRouter>
    <SkeletonTheme baseColor="#ded9d9" highlightColor="#bdbbbb" >
      <div className="App">
        <Routes>
          <Route exact path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
