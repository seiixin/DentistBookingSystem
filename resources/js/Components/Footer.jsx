import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 bg-[#0b2545] rounded-t-2xl
      shadow-neu-inset px-6 py-6 text-center text-[#a3c4f3] font-medium">
      <p>© 2025 Dr. Wang's Dental Clinic. All rights reserved.</p>
      <div className="space-x-6 mt-3">
        {[
          { href: "https://facebook.com", label: "Facebook" },
          { href: "https://instagram.com", label: "Instagram" },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#cbd5e1] transition-shadow shadow-neu-button px-3 py-1 rounded-xl inline-block"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
