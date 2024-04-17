import React from 'react'
import {TextInput,Button,FileInput,Select,Alert} from 'flowbite-react'

export default function CreateUser() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a User</h1>
      <form className='flex flex-col gap-4'>
<div className='flex flex-col gap-4 sm:flex-row justify-between'>
  <TextInput type='text' placeholder='Enter Secrete Key' required id='secreteKey' className='flex-1'/>
  <select>
    <option value='uncategorized'>Select a user category</option>
    <option value='employee'>Employee</option>
    <option value='supplier'>Supplier</option>
  </select>
</div>
<div className='flex flex-col gap-4'>
<input
            type='text'
            placeholder='Register Number'
            id='registerNumber'
            className='bg-slate-100 p-3 rounded-lg'
          />
<input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'/>

<input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'/>
          <input
            type='text'
            placeholder='Phone Number'
            id='phoneNumber'
            className='bg-slate-100 p-3 rounded-lg'
          />

</div>
<Button type='submit' className='bg-blue-500'>Create a User</Button>
      </form>
    </div>
  )
}
