import React, { useState } from 'react';

function NoticeCard({ notice, onDelete, onAdmin }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Function to handle the initial click on the delete button
  const handleInitiateDelete = () => {
    setShowConfirmDelete(true); // Show confirmation buttons
  };

  // Function to confirm the deletion
  const handleConfirmDelete = () => {
    console.log('Delete confirmed for notice:', notice.id);
    onDelete(notice.id); // Call the parent's onDelete function
    setShowConfirmDelete(false); // Hide confirmation after action
  };

  // Function to cancel the deletion
  const handleCancelDelete = () => {
    setShowConfirmDelete(false); // Hide confirmation
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 mb-4 border-l-4 border-[#13C580]
                transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="flex flex-col space-y-4"> {/* Increased space-y for better vertical spacing */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-0"> {/* Increased gap and mb */}
            {/* Category Tag with new color and enhanced styling */}
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-[#13C580]/15 text-[#13C580] font-semibold tracking-wide">
              {notice.category}
            </span>
            {/* Date with slightly adjusted styling */}
            <span className="text-gray-500 text-sm font-medium">{notice.date}</span>
          </div>
          
          {onAdmin && (
            <div className="flex space-x-2">
              {showConfirmDelete ? (
                // Confirmation buttons
                <>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm font-medium"
                    onClick={handleConfirmDelete}
                  >
                    Confirm Delete
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition text-sm font-medium"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // Initial Delete button
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm font-semibold shadow-sm"
                  onClick={handleInitiateDelete}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Notice Title with new color */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{notice.title}</h3>
        
        {/* Notice Description */}
        <p className="text-gray-700 leading-relaxed text-base">{notice.description}</p>
        
        {/* Contact Info (if available) */}
        {notice.contact && (
          <div className="text-sm text-gray-600 pt-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9.293 12.95a1 1 0 00.023 1.353l.015.013a1 1 0 001.32.015l.013-.015a1 1 0 00.015-1.32l-.013-.015a.5.5 0 01-.015-.023V10a1 1 0 10-2 0v2.95z" clipRule="evenodd" />
            </svg>
            Contact: {notice.contact}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoticeCard;
