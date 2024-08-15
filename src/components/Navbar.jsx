import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {

  const { user, logOut, name, photoURL } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("User logged out")
        navigate("/login")

      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
      <div className='flex-1'>
        <div className='flex gap-2 items-center'>
          <img className='w-auto h-7' src='' alt='' />
          <span className='text-xl font-bold text-[#ECBD00]'>ShowCase</span>
        </div>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 flex gap-3'>
          <NavLink to="/">
            <li>
              <div>Home</div>
            </li>
          </NavLink>

          <NavLink to="/allProducts">
                    <li>
                      <div>All Products</div>
                    </li>
                  </NavLink>
          {
            !user && (
              <NavLink to="/login">
                <li>
                  <div>Login</div>
                </li>
              </NavLink>

            )
          }
        </ul>

        {
          user && (
            <>
              <div>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle avatar'
                >
                  <div title={user?.displayName || name} className='w-10 rounded-full'>
                    <img
                      referrerPolicy='no-referrer'
                      alt='User Profile Photo'
                      src={user?.photoURL || photoURL}
                    />
                  </div>
                </div>
              </div>
              <div className='ml-2'>
                <button onClick={handleLogOut} className='btn btn-sm btn-error text-white block text-center'>Logout</button>
              </div>
              
            </>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
