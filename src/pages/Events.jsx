import React, { useState, useEffect } from 'react';
import NoticeCard from '../components/NoticeCard';
import { onNoticesSnapshot } from '../services/noticeService';
import { FiSearch } from 'react-icons/fi';
import { BsCalendarEvent } from 'react-icons/bs';
import { motion } from 'framer-motion';

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onNoticesSnapshot((allNotices) => {
      const eventNotices = allNotices.filter(
        (n) => n.category?.toLowerCase() === 'event'
      );
      setEvents(eventNotices);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = events.filter((n) =>
    `${n.title} ${n.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="border text-black p-16 rounded-md shadow-sm">
      <div className="flex items-center mb-6 gap-3">
        <BsCalendarEvent className="text-[#13C580] text-3xl" />
        <h2 className="text-3xl font-bold text-[#13C580]">Upcoming Events</h2>
      </div>

      <div className="relative mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search community events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#13C580] focus:outline-none text-sm"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 animate-pulse">Loading events...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500">No events found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <NoticeCard notice={event} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Events;
