import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { submitReport } from '../../services/reportService';

const SubmitReport = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    workSummary: '',
    blockers: '',
  });
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'workSummary') {
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.workSummary.trim()) {
      toast.error('Please enter your work summary');
      return;
    }

    setLoading(true);
    try {
      const response = await submitReport(formData);
      if (response.success) {
        toast.success('Report submitted successfully!');
        setFormData({
          workSummary: '',
          blockers: '',
        });
        setCharacterCount(0);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Daily Work Report</h2>
            <p className="text-blue-100 text-sm">Share what you accomplished today</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Work Summary Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Work Summary</span>
              <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${characterCount > 500 ? 'text-orange-500' : 'text-gray-400'}`}>
              {characterCount}/500
            </span>
          </div>
          
          <div className="relative">
            <textarea
              name="workSummary"
              value={formData.workSummary}
              onChange={handleChange}
              rows="5"
              maxLength="500"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="✨ What did you work on today? List your accomplishments, tasks completed, etc..."
              required
            ></textarea>
            {!formData.workSummary && (
              <div className="absolute top-3 right-3 text-gray-300 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              onClick={() => setFormData({...formData, workSummary: formData.workSummary + "✓ Completed user authentication module\n"})}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition"
            >
              + Add task
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, workSummary: formData.workSummary + "🐛 Fixed bug in payment gateway\n"})}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition"
            >
              + Add bug fix
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, workSummary: formData.workSummary + "📚 Attended team meeting\n"})}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition"
            >
              + Add meeting
            </button>
          </div>
        </div>

        {/* Blockers Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Blockers / Challenges</span>
            <span className="text-xs text-gray-400 font-normal">(Optional)</span>
          </label>
          
          <div className="relative">
            <textarea
              name="blockers"
              value={formData.blockers}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="⚠️ Any obstacles or challenges you faced? Need help with something?"
            ></textarea>
            {formData.blockers && (
              <button
                type="button"
                onClick={() => setFormData({...formData, blockers: ''})}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">💡 Tips for a great report:</p>
              <ul className="text-xs space-y-1 text-blue-700">
                <li>• Be specific about what you accomplished</li>
                <li>• Include metrics or numbers if possible</li>
                <li>• Mention any help you need with blockers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Submitting Report...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Submit Report</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmitReport;