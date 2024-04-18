import { Modal, Table, Button } from 'flowbite-react';
import React, { useEffect, useState ,useRef} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
import {useReactToPrint} from 'react-to-print';


export default function Employee() {
  const { currentUser } = useSelector((state) => state.user);
  const [userEmployees, setUserEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
  useEffect(() => {
    const fetchEmployees = async () => {
        setLoading(true);
      try {
        const res = await fetch("/api/employee/getemployees");
        const data = await res.json();
        if (res.ok) {
          setUserEmployees(data.employees);
          if (data.employees.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEmployees();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userEmployees.length;
    try {
      const res = await fetch(
        `/api/employee/getemployees?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserEmployees((prev) => [...prev, ...data.employees]);
        if (data.employees.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleDeleteEmployee = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/employee/deleteemployee/${employeeIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserEmployees((prev) =>
          prev.filter((employee) => employee._id !== employeeIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

//print report
const ComponentsRef=useRef();
const handlePrint=useReactToPrint({
  content:()=>ComponentsRef.current,
  documentTitle:'Employee Report',
  onAfterPrint:()=>alert('Report Successfully Downloaded!'),
})


  

  return (
    <div className="p-3 max-w-9xl mx-auto min-h-screen">
      <div className="flex flex-col gap-4 text-center">
        <h3 className="text-3xl font-semibold">Employee List</h3>
      </div>

      <Link to="/addemployee">
        <button className="bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80 rounded-lg">
          Add Employee
        </button>
      </Link>
      <div className="mt-5"></div>

      <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

        {currentUser.isAdmin && userEmployees.length > 0 ? (
          <><div ref={ComponentsRef}>
            <Table hoverable className='shadow-md border border-gray-300'>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Register Number</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {userEmployees.map((employee) => (
                <Table.Body className='divide-y border border-gray-300' key={employee._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 border-b border-gray-300'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white border border-gray-300'>
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell className='border border-gray-300'>{employee.category}</Table.Cell>
                    <Table.Cell className='border border-gray-300'>{employee.registerNumber}</Table.Cell>
                    <Table.Cell className='border border-gray-300'>{employee.username}</Table.Cell>
                    <Table.Cell className='border border-gray-300'>{employee.email}</Table.Cell>
                    <Table.Cell className='border border-gray-300'>{employee.phoneNumber}</Table.Cell>
                    <Table.Cell className='border border-gray-300'>
                      <img
                        src={employee.image}
                        alt={employee.username}
                        className='w-20 h-20 object-cover bg-gray-500 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell className='border border-gray-300'>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setEmployeeIdToDelete(employee._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell className='border border-gray-300'> 
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-employee/${employee._id}`}
                      >
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
            </div>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )}
            <Button className='bg-slate-700 text-white p-3  uppercase hover:opacity-95 disabled:opacity-80' onClick={handlePrint}>Download Report</Button> 
          </>
        ) : (
          <p>You have no employees yet!</p>
        )}
<Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
      <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this Employee?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteEmployee}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        
      </div>
    </div>
  );
}
