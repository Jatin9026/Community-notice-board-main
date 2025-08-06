import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const primaryCTA = "Post Your Notice";
const navigate = useNavigate();
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-12 overflow-hidden  border-none">

      {/* Blurry Blob Backgrounds */}
      <div className="absolute  overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#13C580]/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-80px] right-[-120px] w-[280px] h-[280px] bg-[#13C580]/20 rounded-full filter blur-2xl animate-ping"></div>
      </div>

      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 -z-20 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center w-full max-w-4xl"
      >
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-[#13C580] drop-shadow-sm tracking-tight">
          Connect. Share. Thrive.
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg lg:text-xl max-w-2xl mb-6 leading-relaxed text-gray-800">
          Your central hub for community updates — announcements, events, buy/sell posts, and essential contacts.
          Empowering local voices to stay informed and connected.
        </p>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white text-gray-700 px-6 py-4 rounded-xl shadow-lg mb-6 max-w-xl  "
        >
          <span className="font-semibold text-gray-900">Our Mission:</span> Build a transparent, inclusive, and connected neighborhood through simplified notice sharing.
        </motion.div>

        {/* CTA Button */}
       
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate('/post')}
  className="group relative font-semibold px-8 py-3 rounded-md text-white bg-black  border-black overflow-hidden shadow-xl transition-all duration-300"
>
          <span className="absolute left-0 top-0 h-full w-full bg-[#13C580] z-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            {primaryCTA}
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
