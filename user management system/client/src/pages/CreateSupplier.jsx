// import React, { useState } from 'react';
// import { TextInput, Button, Select } from 'flowbite-react';

// export default function CreateSupplier() {
//     const [formData, setFormData] = useState({
//         secreteKey: '',
//         category: 'uncategorized',
//         registerNumber: '',
//         username: '',
//         email: '',
//         phoneNumber: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('/api/createuser/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//             const data = await res.json();
//             if (!res.ok) {
//                 console.error('Error:', data.message);
//                 // Handle error response
//                 return;
//             }
//             console.log('Suplier created successfully:', data);
//             // Optionally, you can redirect the user after successful form submission

//             // Replace '/user-profile' with the route you want to redirect to
//             // history.push('/user-profile');
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error
//             Alert.error(`Error: ${error.message}`, {
//                 position: 'top-right',
//                 timeout: 5000,
//                 offset: '10px',
//                 transition: 'slide',
//                 progressColor: 'blue',
//                 closable: true
//             })
//         }
//     };

//     return (
//         <div className='p-3 max-w-3xl mx-auto min-h-screen'>
//             <h1 className='text-center text-3xl my-7 font-semibold'>Create a Supplier as User</h1>
//             <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//                 <div className='flex flex-col gap-4 sm:flex-row justify-between'>
//                     <TextInput
//                         type='text'
//                         placeholder='Enter Secret Key'
//                         required
//                         id='secreteKey'
//                         className='flex-1'
//                         onChange={handleChange}
//                     />
//                     <Select
//                         defaultValue='uncategorized'
//                         onChange={handleChange}
//                     >
//                         <option value='uncategorized'>Select a user category</option>
//                         <option value='fabricSupplier'>Fabric Suppliers</option>
//                         <option value='chemicalSupplier'>Chemical Suppliers</option>
//                         <option value='fiberSupplier'>Fiber Suppliers</option>
//                     </Select>
//                 </div>
//                 <div className='flex flex-col gap-4'>
//                     <TextInput
//                         type='text'
//                         placeholder='Register Number'
//                         id='registerNumber'
//                         className='bg-slate-100 p-3 rounded-lg'
//                         onChange={handleChange}
//                     />
//                     <TextInput
//                         type='text'
//                         placeholder='Username'
//                         id='username'
//                         className='bg-slate-100 p-3 rounded-lg'
//                         onChange={handleChange}
//                     />
//                     <TextInput
//                         type='email'
//                         placeholder='Email'
//                         id='email'
//                         className='bg-slate-100 p-3 rounded-lg'
//                         onChange={handleChange}
//                     />
//                     <TextInput
//                         type='text'
//                         placeholder='Phone Number'
//                         id='phoneNumber'
//                         className='bg-slate-100 p-3 rounded-lg'
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <Button type='submit' className='bg-blue-500'>
//                     Create a User
//                 </Button>
//             </form>
//         </div>
//     );
// }
