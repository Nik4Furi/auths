import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', cpassword: '', dob: '' });

  //---------function handleChange
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/user';

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.cpassword) {
      toast.error('Password or confirm password not match')
      return;
    }

    try {


      const res = await fetch(`${url}/register`, {
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
          <h2 className="text-center mt-5">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter email"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                value={form.cpassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary my-5">Register</button>
          </form>
          <p> Already have an account <Link to='/' style={{ color: 'green', fontWeight: 'bold' }} >Login</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
