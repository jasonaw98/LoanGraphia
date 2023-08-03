"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Nav = () => {

  const [dropDown, setdropDown] = useState(false);

  const contactMail = () => {
    window.location.href = "mailto:jason_aw1998@hotmail.com";
  };

  const Title = () => {
    return (
      <span className="self-center whitespace-nowrap text-lg font-semibold green_gradient sm:text-2xl">
        Discover Loan Analytics with AI
      </span>
    );
  };
  
  return (
    <div>
<nav class="border-gray-200 bg-gray-900">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href={"/"} className="flex items-center">
    <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="LoanGraphia Logo"
            width={40}
            height={100}
          />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">LoanGraphia.AI</span>
    </Link>
    <div className="flex flex-grow justify-center">
          <Title />
        </div>
    <button onClick= {() => setdropDown((prev) => !prev)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={dropDown ? "true" : "false"}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`${dropDown ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
        <li>
          <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Home</Link>
        </li>
        <li>
          <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent" onClick={contactMail}>Contact</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>



    </div>
  );
};

export default Nav;
