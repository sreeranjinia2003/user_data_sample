
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Display all users
  const handleDisplay = async () => {
    try {
      const usersDetails = await axios.get(
        'http://localhost:3000/users'
      );

      setUsers(usersDetails.data);
    } catch (error) {
      console.log(error);
      alert('Unable to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDelete = (id) => {
  axios.delete(`http://localhost:3000/users/${id}`)
    .then(() => {
      alert("Data deleted successfully");
      handleDisplay();
    })
    .catch((error) => {
      console.log(error);
      alert("Unable to delete data");
    });
};

  // Fetch users when Home loads or navigation changes
  useEffect(() => {
    handleDisplay();
  }, [location.key]);

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">User Data</h2>

        <Link to="/Adduser" className="btn btn-primary">
          + Add User
        </Link>
      </div>

      {/* User Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">

          <thead className="table-dark">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading users...</td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Home;
