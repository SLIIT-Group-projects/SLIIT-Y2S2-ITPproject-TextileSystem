
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
//  import { TextInput, Button, Select } from 'flowbite-react';

// export default function CreateUser() {
//   const [formData, setFormData] = useState({
//     secreteKey: '',
//     category: 'uncategorized',
//     registerNumber: '',
//     username: '',
//     email: '',
//     phoneNumber: '',
// });
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/createuser/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       console.log(data);
//       setLoading(false);
//       if (data.success === false) {
//         setError(true);
//         return;
//       }
//       navigate('/');
//     } catch (error) {
//       setLoading(false);
//       setError(true);
//     }
//   };
//   return (
//     <div className='p-3 max-w-3xl mx-auto min-h-screen'>
//         <h1 className='text-center text-3xl my-7 font-semibold'>Create a Supplier as User</h1>
//         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//             <div className='flex flex-col gap-4 sm:flex-row justify-between'>
//                 <TextInput
//                     type='text'
//                     placeholder='Enter Secret Key'
//                     required
//                     id='secreteKey'
//                     className='flex-1'
//                     onChange={handleChange}
//                 />
//                 <Select
//                     defaultValue='uncategorized'
//                     onChange={handleChange}
//                 >
//                     <option value='uncategorized'>Select a user category</option>
//                     <option value='fabricSupplier'>Fabric Suppliers</option>
//                     <option value='chemicalSupplier'>Chemical Suppliers</option>
//                     <option value='fiberSupplier'>Fiber Suppliers</option>
//                 </Select>
//             </div>
//             <div className='flex flex-col gap-4'>
//                 <TextInput
//                     type='text'
//                     placeholder='Register Number'
//                     id='registerNumber'
//                     className='bg-slate-100 p-3 rounded-lg'
//                     onChange={handleChange}
//                 />
//                 <TextInput
//                     type='text'
//                     placeholder='Username'
//                     id='username'
//                     className='bg-slate-100 p-3 rounded-lg'
//                     onChange={handleChange}
//                 />
//                 <TextInput
//                     type='email'
//                     placeholder='Email'
//                     id='email'
//                     className='bg-slate-100 p-3 rounded-lg'
//                     onChange={handleChange}
//                 />
//                 <TextInput
//                     type='text'
//                     placeholder='Phone Number'
//                     id='phoneNumber'
//                     className='bg-slate-100 p-3 rounded-lg'
//                     onChange={handleChange}
//                 />
//             </div>
//             <Button type='submit' className='bg-blue-500'>
//                 Create a User
//             </Button>
//         </form>
//     </div>
// );
// }
