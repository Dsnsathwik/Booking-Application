import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import BookingSummary from "./pages/summary/BookingSummary";
import PaymentFailed from "./pages/payments/failure/failure";
import PaymentSuccess from "./pages/payments/success/success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/booking-summary" element={<BookingSummary/>}/>
        <Route path="/checkout-success" element={<PaymentSuccess/>}/>
        <Route path="/checkout-failure" element={<PaymentFailed/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
