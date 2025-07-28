import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="container mx-auto text-center text-sm px-4">
        <div className="font-medium">
          © {new Date().getFullYear()} Community Notice Board | Built with passion by aspiring engineers.
        </div>
        <div className="mt-4 text-gray-400">
          Bridging neighborhoods with digital collaboration and real-time updates.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
