// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getAllUsers} from '../../utils/UserService';
import "../../style.css"
function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await getAllUsers(token);
      //   console.log(response);
      setUsers(response.usersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <h2>Quản Lý User</h2>
    <button className='update-button' style={{ backgroundColor: '#00bcd4', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer', marginLeft: '5px' }}>
                <Link to={`/register`} style={{ color: '#fff', textDecoration: 'none' }}>Thêm</Link>
              </button>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <thead>
        <tr>
          <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f0f0f0', color: '#333' }}>ID</th>
          <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f0f0f0', color: '#333' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f0f0f0', color: '#333' }}>Email</th>
          <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f0f0f0', color: '#333' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.id}</td>
            <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.name}</td>
            <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{user.email}</td>
            <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
              <button className='delete-button' style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer' }} onClick={() => deleteUser(user.id)}>Xóa</button>
              <button className='update-button' style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer', marginLeft: '5px' }}>
                <Link to={`/update-user/${user.id}`} style={{ color: '#fff', textDecoration: 'none' }}>Cập nhật</Link>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default UserManagementPage;