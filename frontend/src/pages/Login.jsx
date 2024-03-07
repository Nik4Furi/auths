import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  //---------function handleChange
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const url = 'http://localhost:8000/api/user';

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error('All fields are required')
      return;
    }

    try {


      const res = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      const data = await res.json();


      if (data.success === false) {
        toast.error(data?.msg);
        return;
      }

      //------store token in localstorage
      toast.success(data?.msg);

      localStorage.setItem('token', data?.token);

      navigate('/users');

    } catch (error) {
      toast.error(error);
    }


  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary my-4">Login</button>
          </form>
          <p> To create a new accout <Link to='/register' style={{ color: 'green', fontWeight: 'bold' }} >Register</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
