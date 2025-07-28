import React from 'react';
import {
  FaPhoneAlt,
  FaTools,
  FaUserTie,
  FaUserShield,
  FaBolt,
  FaFirstAid,
} from 'react-icons/fa';

// Society-based contact list
const contacts = [
  {
    name: 'Society President',
    info: 'Mr. Rakesh Mehra - +91-9876543210',
    type: 'President',
  },
  {
    name: 'Maintenance Office',
    info: 'maintenance@society.org',
    type: 'Maintenance',
  },
  {
    name: 'Electrician On Call',
    info: '+91-9012345678',
    type: 'Electrician',
  },
  {
    name: 'Security Guard (Main Gate)',
    info: '+91-9876123456',
    type: 'Security',
  },
  {
    name: 'Emergency Medical Help',
    info: '+91-100 or +91-112',
    type: 'Emergency',
  },
];

// Map contact types to icons
const typeIconMap = {
  President: <FaUserTie className="text-[#13C580] text-xl" />,
  Maintenance: <FaTools className="text-[#13C580] text-xl" />,
  Electrician: <FaBolt className="text-[#13C580] text-xl" />,
  Security: <FaUserShield className="text-[#13C580] text-xl" />,
  Emergency: <FaFirstAid className="text-[#13C580] text-xl" />,
};

function Contacts() {
  return (
    <section className="border text-black p-24 rounded-md shadow-md">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaPhoneAlt className="text-[#13C580] text-3xl" />
        <h2 className="text-3xl font-bold text-[#13C580]">
          Society Emergency & Support Contacts
        </h2>
      </div>

      {/* Responsive Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {contacts.map((c, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition duration-300"
          >
            <div className="pt-1">{typeIconMap[c.type]}</div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
              <span className="text-sm text-gray-500 mb-1">({c.type})</span>
              <p className="text-sm font-medium text-gray-700 break-words">{c.info}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Contacts;
