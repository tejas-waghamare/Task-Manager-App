export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  COMPLETED: 'completed',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.PENDING]: 'Pending',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.REVIEW]: 'Review',
  [TASK_STATUS.COMPLETED]: 'Completed',
};

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [TASK_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TASK_STATUS.REVIEW]: 'bg-purple-100 text-purple-800',
  [TASK_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
};

export const USER_ROLES = {
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  TASKS: {
    BASE: '/tasks',
    UPDATE_STATUS: (id) => `/tasks/${id}/status`,
  },
  REPORTS: {
    BASE: '/reports',
    BY_EMPLOYEE: (id) => `/reports/employee/${id}`,
  },
  DASHBOARD: {
    MANAGER: '/dashboard/manager',
    EMPLOYEE: '/dashboard/employee',
  },
};