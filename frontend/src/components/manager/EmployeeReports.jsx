import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getReports } from '../../services/reportService';
import { format } from 'date-fns';

const EmployeeReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredReports = reports.filter(report =>
    report.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.workSummary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee Daily Reports</h2>
        <input
          type="text"
          placeholder="Search by employee or work..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg w-64"
        />
      </div>

      {filteredReports.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reports found</p>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{report.userId?.name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(report.date), 'PPP')}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(report.createdAt), 'h:mm a')}
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

export default EmployeeReports;