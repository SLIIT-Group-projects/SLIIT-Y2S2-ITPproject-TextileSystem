import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link ,useLocation} from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import {useDispatch} from 'react-redux';


export default function Home() {

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
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <Sidebar className=" w-full md:w-56 bg-gray-300 text-gray-500">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to='/profile'>
              <Sidebar.Item 
                active='/profile'
                icon={HiUser} 
                label={"User"} 
                labelColor="dark " 
                className="hover:bg-blue-500 cursor-pointer  border-2 border-blue-500"
                
              >
                Profile
              </Sidebar.Item>
            </Link>
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
