// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const endpoint = isRegistering
//       ? 'https://todo-backend-cr6r.onrender.com/auth/register'
//       : 'https://todo-backend-cr6r.onrender.com/auth/login';

//     try {
//       const response = await axios.post(endpoint, {
//         email: username,
//         password
//       });

//       if (response.status === 200 || response.status === 201) {
//         console.log(isRegistering ? 'Registration successful:' : 'Login successful:', response.data);
//         navigate('/');
//       } else {
//         console.error(isRegistering ? 'Registration failed:' : 'Login failed:', response.data);
//       }
//     } catch (error) {
//       console.error('Error during action:', error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <form className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
//         <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">{isRegistering ? 'Register' : 'Login'}</h2>
//         <div className="mb-4">
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="text"
//             placeholder="Username"
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//           />
//         </div>
//         <div className="mb-6">
//           <input
//             className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
//         >
//           {isRegistering ? 'Register' : 'Login'}
//         </button>
//         <div className="mt-4 text-center">
//           <button
//             type="button"
//             className="text-blue-500 hover:underline"
//             onClick={() => setIsRegistering(!isRegistering)}
//           >
//             {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
