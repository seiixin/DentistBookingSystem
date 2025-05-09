import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4 mt-8">
      <p>© 2025 Dr. Wang's Dental Clinic. All rights reserved.</p>
      <div className="space-x-4 mt-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
