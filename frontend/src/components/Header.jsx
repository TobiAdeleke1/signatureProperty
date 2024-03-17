import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton"; 

export default function Header(){
    const { isLoggedIn, isUserAdmin } = useAppContext();
 
    return (
        <header className='bg-coffee-light shadow-md' >
           
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
               <Link to='/'>
                 <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Solomon</span>
                    <span className='text-slate-700'>Property</span>
                 </h1>
                </Link>
                
                {/* <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                     type="text" 
                     placeholder='Search...' 
                     className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                    <FaSearch className="text-slate-600"/>
                </form> */}

                <ul className="flex gap-4">
               
                    <Link to='/'>
                            <li className="hidden sm:inline text-slate-700 hover:underline">Home </li>
                    </Link>
            
        
                    { isLoggedIn ? (<>
                        
                        <Link to='/about'>
                            <li className="hidden sm:inline text-slate-700 hover:underline">
                            About 
                            </li>
                        </Link>
                        <Link to='/my-bookings'>
                            <li className="sm:inline text-slate-700 hover:underline"> 
                            My Bookings
                            </li>
                       </Link>
                      
                  
                       <SignOutButton />

                        </> )
                        : (
                        <>
                  
                        <Link to='/sign-in'>
                        <li className="sm:inline text-slate-700 hover:underline"> 
                        Sign In
                        </li>
                        </Link>
                      
                      </>
                    ) }         

                    {isUserAdmin && 
                     <Link to='/my-properties'>
                            <li className="sm:inline text-slate-700 hover:underline"> 
                            My Properties
                            </li>
                       </Link> }    
             
                      
                </ul>
            </div>
        </header>
    )
}