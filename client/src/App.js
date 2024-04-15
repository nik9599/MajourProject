import "./App.css";
import Cart from "./Component/Pages/CartPage/Cart";
import Landing from "./Component/Pages/LandingPage/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import SignUp from "./Component/Pages/SIgnupPage/SignUp";
import Login from "./Component/Pages/LoginPages/Login";
import Payment from "./Component/Pages/Payment/Payment";
import Profile from "./Component/Pages/ProfilePage/Profile";
import PreviousOrder from "./Component/Pages/Previous Order/PreviousOrder";
import { useSelector } from "react-redux";

function App() {
  const userLogedIn = useSelector((state) => state.login.login.isLogedIn);

  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#ded9d9" highlightColor="#bdbbbb">
        <div className="App">
          <Routes>
            {userLogedIn ? (
              <>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/signUp" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/payment/:orderId" element={<Payment />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route
                  exact
                  path="/previousOrder"
                  element={<PreviousOrder />}
                />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/signUp" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
