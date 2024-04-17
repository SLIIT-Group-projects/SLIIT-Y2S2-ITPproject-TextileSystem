// AdminHome.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//sidebar
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight,HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie } from "react-icons/hi";

import { Link ,useLocation} from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import {useDispatch} from 'react-redux';
export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const path= useLocation().pathname;
  const dispatch=useDispatch();
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/users'); // Make sure the endpoint matches your backend route
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Sidebar className=" w-full md:w-56 bg-gray-300 text-gray-500">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to='/profile'>
              <Sidebar.Item 
                active='/profile'
                icon={HiUser} 
                label={"Admin"} 
                labelColor="dark " 
                className="hover:bg-blue-500 cursor-pointer  border-2 border-blue-500"
                
              >
                Profile
              </Sidebar.Item>
            </Link>

            <Link to='/users'>

            <Sidebar.Item 
              active={true}
              icon={HiAnnotation} 
              
              labelColor="blue" 
              className="hover:bg-blue-500 cursor-pointer border-2 border-blue-500" 
            >
              Users
            </Sidebar.Item></Link>

            <Link to='/employees'>

            <Sidebar.Item 
              active={true}
              icon={HiOutlineUserGroup} 
              
              labelColor="blue" 
              className="hover:bg-blue-500 cursor-pointer border-2 border-blue-500" 
            >
              Employees
            </Sidebar.Item></Link>
            <Sidebar.Item 
              active={true}
              icon={HiDocumentText} 
              
              labelColor="blue" 
              className="hover:bg-blue-500 cursor-pointer border-2 border-blue-500" onClick={handleSignOut}
            >
             Suppliers
            </Sidebar.Item>
            <Sidebar.Item 
              active={true}
              icon={HiArrowSmRight} 
              
              labelColor="blue" 
              className="hover:bg-blue-500 cursor-pointer border-2 border-blue-500" onClick={handleSignOut}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
