import  React from 'react';
import { Link } from 'react-router-dom';

const Employee = () => {

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <div className="flex flex-col gap-4">
                <h3 className='text-3xl text-center font-semibold my-7'>Employee List</h3>
                </div>

                <Link to='/addemployee'>
                <button className='bg-slate-700 text-white p-3  uppercase hover:opacity-95 disabled:opacity-80 rounded-lg'>Add Employee</button></Link>
                <div className="mt-5"></div>
                </div>);};
export default Employee;