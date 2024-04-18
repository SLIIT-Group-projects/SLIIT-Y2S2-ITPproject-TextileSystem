import { Link ,useLocation} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux';
import {Avatar,Button,Navbar,TextInput,Dropdown} from 'flowbite-react';
import{AiOutlineSearch} from 'react-icons/ai'
import LogoImage from '../images/logo.png'; // Import your signup image
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiOutlineUserGroup,
  HiChartPie,
  HiArrowSmRight,
} from "react-icons/hi";
import { signOut } from "../redux/user/userSlice";

  
export default function Header() {
  const path= useLocation().pathname;
  const {currentUser}= useSelector(state=>state.user);
  const dispatch=useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div>
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
       <div className='flex items-center gap-2'>
       <img src={LogoImage} alt="PTI TEXTILE Logo" className='w-30 h-12'/>

       <h1 className='font-bold' > TEXTILE</h1>
        
        </div> 

        <form>
          <TextInput 
          type="text" placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"/>
        </form>
        <Button className="w-12 h-10 lg:hidden " color='gray' pill><AiOutlineSearch/></Button>

        
        <ul className='flex gap-4'>
        <Link to={currentUser?.isAdmin ? '/dashboard' : '/'}>
            <li>{currentUser?.isAdmin ? 'Admin-Home' : 'Home'}</li>
          </Link>
          
          <Link to='/about'>
          <li>About</li>
          </Link>
          
            {currentUser?(<Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded={true}/>}>
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>

              <Link to={'/profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
           
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>

            </Dropdown>
              
            ):(
              <Link to={'/sign-in'}><li>Sign In</li></Link>
          
          )}
          
        </ul>

      </div>

      
  

    </div>
    
    </div>)}
