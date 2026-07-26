import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";


import {
FaSearch,
FaUserPlus,
FaEdit,
FaTrash,
FaEye,
FaLock
}
 from "react-icons/fa";
import { getAllUsers } from "../../api/adminApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.accountNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users-page">
      <AdminSidebar />

      <div className="users-container">

        <div className="users-header">

          <div>
            <h1>Users Management</h1>
            <p>Manage all Apna Bank customers.</p>
          </div>

          <button className="add-user-btn">
            <FaUserPlus />
            Add User
          </button>

        </div>

        <div className="search-wrapper">
            <FaSearch />

          <input
            type="text"
            placeholder="Search by name, email or account number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
            <div className="users-stats">

    

    <div className="user-stat-card active-card">
        <h3>{users.filter(u=>u.status==="active").length}</h3>
        <p>Active</p>
    </div>

    <div className="user-stat-card inactive-card">
        <h3>{users.filter(u=>u.status==="inactive").length}</h3>
        <p>Inactive</p>
    </div>

    <div className="user-stat-card blocked-card">
        <h3>{users.filter(u=>u.status==="blocked").length}</h3>
        <p>Blocked</p>
    </div>

</div>
<div className="user-stat-card">
        <h3>{users.length}</h3>
        <p>Total Users</p>
    </div>

          

        </div>

        <div className="users-table-card">

          <table>

            <thead>

<tr>

<th>#</th>

<th>Name</th>

<th>Email</th>

<th>Account</th>

<th>Balance</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td colSpan="7" className="empty-row">
                    <>
<h3>No Users Found</h3>
<p>Try another search keyword.</p>
</>
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user,index) => (

                  <tr key={user.userId}>
                    <td>{index + 1}</td>

                    <td>

<div className="user-info">

<div className="avatar">

{user.fullName?.charAt(0)}

</div>

<div>

<h4>{user.fullName}</h4>

<p>{user.accountNumber}</p>

</div>

</div>

</td>

                    <td>{user.email}</td>

                    <td>{user.accountNumber}</td>

                    <td>₹ {Number(user.balance || 0).toLocaleString("en-IN")}</td>

                    <td>

                      <span
                        className={`status status-${user.status}`}
                      >
                        {user.status}
                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

<button
  className="view-btn"
  onClick={() => {
    setSelectedUser(user);
    setShowModal(true);
  }}
>
  <FaEye />
</button>

<button className="edit-btn">

<FaEdit/>

</button>

<button className="lock-btn">

<FaLock/>

</button>

</div>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
          <div className="pagination">

<button>Previous</button>

<span className="active-page">1</span>

<span>2</span>

<span>3</span>

<button>Next</button>

</div>

        </div>

      </div>
      

    </div>
  );
};

export default AdminUsers;