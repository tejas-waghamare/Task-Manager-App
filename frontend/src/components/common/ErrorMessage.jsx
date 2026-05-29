import React from 'react';

const ErrorMessage = ({ message, onRetry, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-circle text-red-600 text-lg"></i>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-1 text-sm text-red-700">{message}</div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-700 hover:text-red-800 font-medium"
            >
              Try again →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;