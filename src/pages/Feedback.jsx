import React from 'react';
import { FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const feedbacks = [
  {
    name: 'Amit (Student)',
    quote:
      'This notice board keeps me updated about campus events and opportunities!',
  },
  {
    name: 'Neha (Resident)',
    quote:
      'Very useful for our community. I found my lost keys thanks to a notice here.',
  },
  {
    name: 'Priya (CR)',
    quote:
      'Posting reminders and contacts is so easy now. Great initiative!',
  },
  {
    name: 'Ravi (Volunteer)',
    quote:
      'The buy/sell section helped me get affordable books and gadgets easily.',
  },
];

function Feedback() {
  return (
    <section className="border text-black px-6 py-16 rounded-md">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-10">
        <FaQuoteLeft className="text-[#13C580] text-3xl" />
        <h2 className="text-3xl font-bold text-[#13C580]">
          User Feedback & Experiences
        </h2>
      </div>

      {/* Feedback Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg p-6 transition duration-300"
          >
            <div className="flex items-start gap-4">
              <FaUserCircle className="text-[#13C580] text-4xl" />
              <div>
                <p className="text-gray-700 italic text-base mb-3">
                  “{f.quote}”
                </p>
                <p className="text-sm font-semibold text-[#13C580]">
                  — {f.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Feedback;
