import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import Bookings from "./pages/Bookings"
import Properties from "./pages/AddProperties"
import AllProperties from "./pages/Property"
import { useAppContext } from "./contexts/AppContext"

export default function App(){
  const {isLoggedIn} = useAppContext();
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />}/>
      <Route path="/all-properties" element={<AllProperties />} />
      <Route path="/profile" element={<Profile />} />
     
      {isLoggedIn && <>
        {/* <Route path="/all-properties" element={<AllProperties />} /> */}
        <Route path="/my-bookings" element={<Bookings />} />
        <Route path="/my-properties" element={<Properties />} />
      </>}
      
    </Routes>
  </BrowserRouter>

  );
}