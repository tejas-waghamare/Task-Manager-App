import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-tasks text-3xl text-blue-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

         

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }
//     setLoading(true);
//     const success = await login(email, password);
//     setLoading(false);
//     if (success) {
//       navigate('/dashboard', { replace: true });
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
//       <div className="relative h-full flex items-center justify-center p-4">
//         <div className="w-full max-w-[420px]">
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-8">
//             {/* <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl mb-5 transform hover:scale-105 transition-transform duration-300">
//               <i className="fas fa-tasks text-3xl text-white"></i>
//             </div> */}
//             {/* <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">TaskFlow</h1> */}
//             <p className="text-purple-200 text-sm">Your Ultimate Task Management Solution</p>
//           </div>

//           {/* Login Card */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
//               <p className="text-purple-200 text-sm mt-1">Sign in to continue</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
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
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center cursor-pointer">
//                   <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500" />
//                   <span className="ml-2 text-purple-200">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   className="text-purple-300 hover:text-white transition-colors"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>

//             <div className="mt-5 text-center">
//               <p className="text-purple-200 text-sm">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="text-white font-semibold hover:text-purple-200 transition-colors"
//                 >
//                   Sign up
//                 </button>
//               </p>
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

// export default Login;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorVariant, setCursorVariant] = useState('default');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }
//     setLoading(true);
//     const success = await login(email, password);
//     setLoading(false);
//     if (success) {
//       navigate('/dashboard', { replace: true });
//     }
//   };

//   return (
//     <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Custom Cursor */}
//       <div 
//         className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
//         style={{
//           left: mousePosition.x - 12,
//           top: mousePosition.y - 12,
//         }}
//       >
//         <div className="relative">
//           {/* Outer ring */}
//           <div className="absolute w-8 h-8 rounded-full border-2 border-purple-400/50 animate-ping-slow"></div>
//           {/* Inner dot */}
//           <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"></div>
//         </div>
//       </div>

//       {/* Animated Background with Mouse Follow */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Mouse-following spotlight */}
//         <div 
//           className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl transition-transform duration-300 ease-out pointer-events-none"
//           style={{
//             left: mousePosition.x - 300,
//             top: mousePosition.y - 300,
//           }}
//         ></div>
        
//         {/* Animated gradient orbs */}
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
//         {/* Particle system that follows mouse */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(30)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 animate-float-particle"
//               style={{
//                 '--tx': `${(mousePosition.x - window.innerWidth / 2) * 0.02 * (i % 5)}px`,
//                 '--ty': `${(mousePosition.y - window.innerHeight / 2) * 0.02 * (i % 5)}px`,
//                 animationDelay: `${i * 0.1}s`,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
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
//       <div className="relative h-full flex items-center justify-center p-4">
//         <div className="w-full max-w-[420px]">
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl mb-5 transform hover:scale-105 transition-transform duration-300">
//               <i className="fas fa-tasks text-3xl text-white"></i>
//             </div>
//             <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">TaskFlow</h1>
//             <p className="text-purple-200 text-sm">Your Ultimate Task Management Solution</p>
//           </div>

//           {/* Login Card */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
//               <p className="text-purple-200 text-sm mt-1">Sign in to continue</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-purple-200 mb-1.5">
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <i className="fas fa-envelope text-purple-300 text-sm"></i>
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center cursor-pointer">
//                   <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500" />
//                   <span className="ml-2 text-purple-200">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   className="text-purple-300 hover:text-white transition-colors"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>

//             <div className="mt-5 text-center">
//               <p className="text-purple-200 text-sm">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="text-white font-semibold hover:text-purple-200 transition-colors"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>

//             <div className="mt-5 p-3 bg-white/5 rounded-lg border border-white/10">
//               <div className="flex items-center mb-2">
//                 <i className="fas fa-key text-purple-300 text-xs mr-1.5"></i>
//                 <span className="text-xs text-purple-200 font-medium">Demo Credentials</span>
//               </div>
//               <div className="space-y-1 text-xs">
//                 <div className="flex justify-between items-center text-purple-200">
//                   <span>Manager:</span>
//                   <code className="text-purple-300 bg-white/10 px-2 py-0.5 rounded text-[11px]">manager@example.com / 123456</code>
//                 </div>
//                 <div className="flex justify-between items-center text-purple-200">
//                   <span>Employee:</span>
//                   <code className="text-purple-300 bg-white/10 px-2 py-0.5 rounded text-[11px]">employee@example.com / 123456</code>
//                 </div>
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
        
//         @keyframes float-particle {
//           0% {
//             transform: translate(0, 0) scale(0);
//             opacity: 0;
//           }
//           50% {
//             transform: translate(var(--tx, 0), var(--ty, 0)) scale(1);
//             opacity: 0.5;
//           }
//           100% {
//             transform: translate(calc(var(--tx, 0) * 2), calc(var(--ty, 0) * 2)) scale(0);
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
        
//         .animate-float-particle {
//           animation: float-particle 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;