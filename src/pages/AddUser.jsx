
import axios from 'axios';
import React, { useState } from 'react';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const user = { name, email, age };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !age) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:3000/users',
        user
      );

      console.log(res.data);
      alert('User data added successfully');

      setName('');
      setEmail('');
      setAge('');
    } catch (error) {
      console.log(error);
      alert('Unable to add user');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add User</h4>
            </div>

            <div className="card-body">
              <form>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleAdd}
                >
                  Add
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddUser;
