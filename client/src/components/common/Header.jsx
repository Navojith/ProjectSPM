import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {

  const [currentUser , setCurrentUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);
      setCurrentUser(user);
    }
  }
)
},[])

  return (
    <nav className="  bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          {/* <img
            
          /> */}
         
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Retina
          </span>
        </a>
       
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li> */}
          </ul>
        </div>
        <div>
           <a href = "/login">
           {!currentUser ? (
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
                Login
              </button>
            ) : (
              <a href ="profile">
              <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
                {currentUser?.email?.toString(0)?.toUpperCase()}  
                </button> 
                </a>   
            )}
            
            </a>  </div>
        </div> 
    </nav>
  );
};

export default Header;
