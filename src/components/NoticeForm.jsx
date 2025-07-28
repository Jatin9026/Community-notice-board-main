import React, { useState } from 'react';

const categories = [
  'Announcement',
  'Event',
  'Buy/Sell',
  'Lost & Found',
  'Reminder',
];

function NoticeForm({ onSubmit, isSubmitting = false }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.description || !form.date) {
      setError('Please fill in all required fields.');
      return;
    }
    onSubmit(form);
    setSuccess('Notice posted successfully!');
    // Clear form only if submission is successful and not pending
    // This condition was added in a previous turn to prevent clearing while submitting
    if (!isSubmitting) {
      setForm({ title: '', category: '', description: '', date: '', contact: '' });
    }
  };

  const buttonText = isSubmitting ? 'Posting...' : 'Post Notice';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-xl mx-auto border border-gray-200"> {/* Updated styling for form container */}
      <div className="mb-5"> {/* Increased margin-bottom for better spacing */}
        <label className="block font-semibold mb-2 text-gray-700">Title<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#13C580] focus:border-transparent transition duration-200 text-gray-800"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Category<span className="text-red-500">*</span></label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#13C580] focus:border-transparent transition duration-200 bg-white text-gray-800"
          required
          disabled={isSubmitting}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Description<span className="text-red-500">*</span></label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#13C580] focus:border-transparent transition duration-200 text-gray-800"
          rows={2} // Increased rows for better input area
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Date<span className="text-red-500">*</span></label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#13C580] focus:border-transparent transition duration-200 text-gray-800"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-6">
        <label className="block  font-semibold mb-2 text-gray-700">Contact (optional)</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          className="w-full border  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#13C580] focus:border-transparent transition duration-200 text-gray-800"
          disabled={isSubmitting}
        />
      </div>
      {error && <div className="bg-red-100  border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm text-center">{error}</div>}
      {success && <div className="bg-green-100  border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 text-sm text-center">{success}</div>}
      
      {/* Animated Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`group relative font-semibold px-8 py-3 rounded-md  border-black text-white bg-black overflow-hidden transition-all duration-300 ease-in-out w-full
          ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
      >
        {/* Background animation layer */}
        <span className="absolute left-0 top-0 h-full w-full bg-[#13C580] z-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        {/* Text layer that changes color on hover */}
        <span className="relative z-10 group-hover:text-white transition-colors duration-500">
          {buttonText}
        </span>
      </button>
    </form>
  );
}

export default NoticeForm;
