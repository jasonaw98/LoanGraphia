"use client";
import { Navbar } from "flowbite-react";
import Link from "next/link";

const Nav = () => {

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
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand as={Link} href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="LoanGraphia Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LoanGraphia.AI
          </span>
        </Navbar.Brand>
        <div className="flex flex-grow justify-center">
          <Title />
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link as={Link} href="/" className="dark:text-white">Home</Navbar.Link>
          {/* <Navbar.Link as={Link} href="/" className="dark:text-white">About</Navbar.Link> */}
          <Navbar.Link as={Link} href="/" className="dark:text-white" onClick={contactMail}>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
