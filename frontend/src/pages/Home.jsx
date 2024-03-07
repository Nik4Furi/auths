import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast'



const Home = () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // console.log(import.meta.env.VITE_BACKEND_URL)

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/user';


  const fetchAllUsers = async () => {
    try {

      const res = await fetch(`${url}/allUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      })

      const data = await res.json();

      if (data.success === false) {
        toast.error(data?.msg);
        return;
      }

      setUsers(data?.users);

    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {

    if (!token){

      navigate('/')
      return;
    }

    fetchAllUsers();

  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mt-5">User List</h2>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.dob?.split('T')?.[0]}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
