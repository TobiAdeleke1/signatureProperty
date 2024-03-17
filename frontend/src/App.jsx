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
import EditProperty from "./pages/EditProperty"
import Search from "./pages/Search"
import MyBookings from "./pages/MyBookings";
import { useAppContext } from "./contexts/AppContext"
import Details from "./pages/Details"

export default function App(){
  const {isLoggedIn, isUserAdmin} = useAppContext();


  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/all-properties" element={<AllProperties />} />
      <Route path="/search" element={<Search />}/>
      <Route path="/detail/:propertyId" element={<Details />} />
       
     {isLoggedIn && <>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/property/:propertyId/booking" element={<Bookings />} />
        
      </>}

      {isLoggedIn && isUserAdmin && <>
      
        <Route path="/edit-property/:propertyId" element={<EditProperty />} />
        {/* <Route path="/property/:propertyId/booking" element={<Bookings />} /> */}
        <Route path="/my-properties" element={<Properties />} />
      </> }
      
    </Routes>
  </BrowserRouter>

  );
}