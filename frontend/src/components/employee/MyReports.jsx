import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getReports } from '../../services/reportService';
import { format } from 'date-fns';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getReports();
      if (response.success) {
        setReports(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Daily Reports</h2>
      
      {reports.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reports submitted yet</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">
                  {format(new Date(report.date), 'PPP')}
                </span>
                <span className="text-sm text-gray-500">
                  Submitted: {format(new Date(report.createdAt), 'h:mm a')}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">
                  <strong>Work Summary:</strong> {report.workSummary}
                </p>
                {report.blockers && (
                  <p className="text-red-600 mt-1">
                    <strong>Blockers:</strong> {report.blockers}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;