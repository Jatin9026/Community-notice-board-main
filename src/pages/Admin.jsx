import React, { useState, useEffect } from 'react';
import NoticeCard from '../components/NoticeCard';
import { onNoticesSnapshot, deleteNotice } from '../services/noticeService';

const ADMIN_PASSWORD = 'admin123'; // In a real application, secure this properly.

function Admin() {
  const [notices, setNotices] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (authenticated) {
      setLoading(true);
      unsubscribe = onNoticesSnapshot((allNotices) => {
        setNotices(allNotices);
        setLoading(false);
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [authenticated]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteNotice(id);
      if (result.success) {
        setNotices((prev) => prev.filter((n) => n.id !== id));
        setError('');
      } else {
        setError(`Failed to delete notice: ${result.error}`);
      }
    } catch (err) {
      setError(`Error deleting notice: ${err.message}`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const loginButtonText = "Login to Admin Panel";

  if (!authenticated) {
    return (
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4 py-8">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px),
              repeating-linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>

        <div className="relative z-10 bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mx-auto border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-[#13C580]">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#13C580] transition"
              required
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="group relative font-semibold px-8 py-3 rounded-md border  text-white bg-black overflow-hidden transition-all duration-300 ease-in-out w-full"
            >
              <span className="absolute left-0 top-0 h-full w-full bg-[#13C580] z-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {loginButtonText}
              </span>
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col items-center min-h-[calc(100vh-150px)] px-4 py-12 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 50px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="mb-6 text-right">
          <span className="inline-block bg-[#13C580]/10 text-[#13C580] px-5 py-2 rounded-full font-semibold shadow text-sm tracking-wide">
            Admin: Jatin
          </span>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#13C580]">
          Manage Community Notices
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No notices to manage.</div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} onAdmin />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
