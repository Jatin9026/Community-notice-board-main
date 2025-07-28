import React, { useState, useEffect } from 'react';
import NoticeCard from '../components/NoticeCard';
import { onNoticesSnapshot } from '../services/noticeService';
import { FiSearch } from 'react-icons/fi';
import { BsMegaphone } from 'react-icons/bs';
import { motion } from 'framer-motion';

function Announcements() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onNoticesSnapshot((allNotices) => {
      const filteredNotices = allNotices.filter(
        (n) =>
          n.category &&
          n.category.toLowerCase() !== 'event' &&
          n.category.toLowerCase() !== 'buy/sell'
      );
      setNotices(filteredNotices);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = notices.filter((n) =>
    `${n.title} ${n.description} ${n.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-white text-black p-16 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-6 gap-3">
        <BsMegaphone className="text-[#13C580] text-3xl" />
        <h2 className="text-3xl font-bold text-[#13C580]">Latest Announcements</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search announcements by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#13C580] focus:outline-none text-sm"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 animate-pulse">Loading announcements...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500">No announcements found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NoticeCard notice={notice} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Announcements;
