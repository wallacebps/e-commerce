import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto px-4 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
        <div className="text-center lg:text-left">
          <h3 className="text-sm font-semibold text-white">
            E-comn Dashboard
          </h3>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/wallacebps/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <span className="sr-only">LinkedIn</span>
            <i className="fab fa-linkedin text-xl lg:text-2xl"></i>
          </a>
          <a
            href="https://github.com/wallacebps"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            <span className="sr-only">GitHub</span>
            <i className="fab fa-github text-xl lg:text-2xl"></i>
          </a>
        </div>

        <div className="flex justify-center items-center space-x-4 text-xs">
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
