import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { submitReport } from '../../services/reportService';

const SubmitReport = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    workSummary: '',
    blockers: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Submit Daily Work Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Summary *
          </label>
          <textarea
            name="workSummary"
            value={formData.workSummary}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What did you work on today? List your accomplishments, tasks completed, etc."
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blockers / Challenges
          </label>
          <textarea
            name="blockers"
            value={formData.blockers}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any obstacles or challenges you faced? (Optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default SubmitReport;