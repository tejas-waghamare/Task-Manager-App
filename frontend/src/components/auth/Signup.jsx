import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const success = await signup(formData.name, formData.email, formData.password, formData.role);
    setLoading(false);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user-plus text-3xl text-green-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2">Join TaskManager today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-check-circle text-gray-400"></i>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-briefcase text-gray-400"></i>
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-200 font-medium shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'employee',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     const success = await signup(formData.name, formData.email, formData.password, formData.role);
//     setLoading(false);
    
//     if (success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Animated gradient orbs */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
//         {/* Animated lines */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin-slow">
//             <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//             <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//             <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - No Scroll Needed */}
//       <div className="relative h-full flex items-center justify-center p-4 overflow-y-auto">
//         <div className="w-full max-w-[440px] py-4">
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-6">
//             {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
//               <i className="fas fa-user-plus text-2xl text-white"></i>
//             </div> */}
//             {/* <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Create Account</h1> */}
//             <p className="text-purple-200 text-sm">Join TaskFlow and start managing tasks</p>
//           </div>

//           {/* Signup Card */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//             <form onSubmit={handleSubmit} className="space-y-3.5">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-user text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="Tejas Waghmare"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-envelope text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-lock text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-9 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-purple-300 hover:text-white text-sm transition-colors`}></i>
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-check-circle text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-9 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-purple-300 hover:text-white text-sm transition-colors`}></i>
//                   </button>
//                 </div>
//               </div>

//               {/* Role Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Role
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-briefcase text-purple-300 text-sm"></i>
//                   </div>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
//                   >
//                     <option value="employee" className="bg-purple-900">Employee</option>
//                     <option value="manager" className="bg-purple-900">Manager</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm mt-2"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating account...
//                   </span>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>

//             {/* Login Link */}
//             <div className="mt-5 text-center">
//               <p className="text-purple-200 text-sm">
//                 Already have an account?{' '}
//                 <button
//                   onClick={() => navigate('/login')}
//                   className="text-white font-semibold hover:text-purple-200 transition-colors"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>

//             {/* Password Hint */}
//             <div className="mt-4 p-2.5 bg-white/5 rounded-lg border border-white/10">
//               <div className="flex items-center gap-2">
//                 <i className="fas fa-info-circle text-purple-300 text-xs"></i>
//                 <span className="text-xs text-purple-200">Password must be at least 6 characters long</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.3;
//           }
//           50% {
//             transform: scale(1.1);
//             opacity: 0.5;
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         .animate-pulse {
//           animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
        
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
        
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'employee',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     const success = await signup(formData.name, formData.email, formData.password, formData.role);
//     setLoading(false);
    
//     if (success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-900">
//       {/* Custom Cursor */}
//       <div 
//         className="fixed pointer-events-none z-20 transition-transform duration-75 ease-out"
//         style={{
//           left: mousePosition.x - 7,
//           top: mousePosition.y - 7,
//         }}
//       >
//         <div className="relative">
//           <div className="absolute w-8 h-8 rounded-full border-2 border-purple-400/50 animate-ping-slow"></div>
//           <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"></div>
//         </div>
//       </div>

//       {/* Animated Background with Mouse Follow */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Mouse-following spotlight */}
//         <div 
//           className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl transition-transform duration-300 ease-out pointer-events-none"
//           style={{
//             left: mousePosition.x - 300,
//             top: mousePosition.y - 300,
//           }}
//         ></div>
        
//         {/* Animated gradient orbs */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
//         {/* Interactive particle grid */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full animate-particle-move"
//               style={{
//                 '--dx': `${(mousePosition.x - window.innerWidth / 2) * 0.01 * (i % 3)}px`,
//                 '--dy': `${(mousePosition.y - window.innerHeight / 2) * 0.01 * (i % 3)}px`,
//                 left: `${(i * 5) % 100}%`,
//                 top: `${(i * 7) % 100}%`,
//                 animationDelay: `${i * 0.2}s`,
//               }}
//             ></div>
//           ))}
//         </div>
        
//         {/* Animated lines */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin-slow">
//             <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//             <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//             <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20"></div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative h-full flex items-center justify-center p-4 overflow-y-auto">
//         <div className="w-full max-w-[440px] py-4">
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-6">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300">
//               <i className="fas fa-user-plus text-2xl text-white"></i>
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Create Account</h1>
//             <p className="text-purple-200 text-sm">Join TaskFlow and start managing tasks</p>
//           </div>

//           {/* Signup Card */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//             <form onSubmit={handleSubmit} className="space-y-3.5">
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-user text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-envelope text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-lock text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-9 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-purple-300 hover:text-white text-sm transition-colors`}></i>
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-check-circle text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-9 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   >
//                     <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-purple-300 hover:text-white text-sm transition-colors`}></i>
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Role
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-briefcase text-purple-300 text-sm"></i>
//                   </div>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
//                   >
//                     <option value="employee" className="bg-purple-900">Employee</option>
//                     <option value="manager" className="bg-purple-900">Manager</option>
//                   </select>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm mt-2"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating account...
//                   </span>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>

//             <div className="mt-5 text-center">
//               <p className="text-purple-200 text-sm">
//                 Already have an account?{' '}
//                 <button
//                   onClick={() => navigate('/login')}
//                   className="text-white font-semibold hover:text-purple-200 transition-colors"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>

//             <div className="mt-4 p-2.5 bg-white/5 rounded-lg border border-white/10">
//               <div className="flex items-center gap-2">
//                 <i className="fas fa-info-circle text-purple-300 text-xs"></i>
//                 <span className="text-xs text-purple-200">Password must be at least 6 characters long</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.3;
//           }
//           50% {
//             transform: scale(1.1);
//             opacity: 0.5;
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes ping-slow {
//           0% {
//             transform: scale(1);
//             opacity: 0.5;
//           }
//           75%, 100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }
        
//         @keyframes particle-move {
//           0% {
//             transform: translate(0, 0) scale(0);
//             opacity: 0;
//           }
//           50% {
//             transform: translate(var(--dx, 0), var(--dy, 0)) scale(1);
//             opacity: 0.6;
//           }
//           100% {
//             transform: translate(calc(var(--dx, 0) * 2), calc(var(--dy, 0) * 2)) scale(0);
//             opacity: 0;
//           }
//         }
        
//         .animate-pulse {
//           animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
        
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
        
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
        
//         .animate-ping-slow {
//           animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
        
//         .animate-particle-move {
//           animation: particle-move 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Signup;