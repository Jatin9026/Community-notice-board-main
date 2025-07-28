import React, { useState } from 'react';
import NoticeForm from '../components/NoticeForm';
import { useNavigate } from 'react-router-dom';
import { addNotice } from '../services/noticeService';

function PostNotice() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formKey, setFormKey] = useState(0); // Key to force NoticeForm re-render and reset

  const handlePost = async (notice) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const result = await addNotice(notice);

      if (result.success) {
        setSuccess('Notice posted successfully!');
        setFormKey(prevKey => prevKey + 1); // Increment key to reset NoticeForm
        // Redirect after a short delay to allow user to see success message
        setTimeout(() => {
          if (notice.category === 'Event') navigate('/events');
          else if (notice.category === 'Buy/Sell') navigate('/buy-sell');
          else navigate('/announcements');
        }, 1200); // Redirect after 1.2 seconds
      } else {
        setError('Failed to post notice. Please try again.');
      }
    } catch (err) { // Catch the error object to log it
      console.error("Error in handlePost:", err); // Log the actual error for debugging
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8 overflow-hidden">
      {/* Background Grid Lines */}
      <div
        className="absolute  pointer-events-none"
       
      ></div>

      {/* Blurry Blob Backgrounds - Adjusted z-index to be above grid but below content */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] blur-[120px] rounded-full z-[1] animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-[#13C580]/10 blur-[100px] rounded-full z-[1] animate-ping"></div>

      {/* Main Content Wrapper - Ensure it's above background elements */}
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#13C580] drop-shadow-sm">Post a New Notice</h2>
          <p className="mt-2 text-gray-600">Let your community know about announcements, events, and more.</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm text-center shadow">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 text-sm text-center shadow">
            {success}
          </div>
        )}

        {/* NoticeForm component with key for reset */}
        <NoticeForm key={formKey} onSubmit={handlePost} isSubmitting={isSubmitting} />
      </div>
    </section>
  );
}

export default PostNotice;
