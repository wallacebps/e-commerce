import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto px-4 text-center">

        <h3 className="text-sm font-semibold text-white">
          E-comn Dashboard
        </h3>
        <p className="text-xs mt-1">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>

        <div className="mt-2 space-x-4 text-xs">
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
