'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, toggleModal } from '@/redux/userSlice';
import Modal from '../modules/Modal';

import ClipLoader from "react-spinners/ClipLoader";

const fetchUsers = async (page) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=5&_page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch Users!");
  return res.json();
}

function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(true);

  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.user.modalOpen);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(page);
        setUsers(data);
        const nextPageData = await fetchUsers(page + 1);
        setHasData(nextPageData.length > 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey].localeCompare(b[sortKey]);
  })

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
    ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className='container mx-auto p-4 relative'>
      <input
        className='border border-zinc-500 w-full p-2 mb-10 rounded-md focus:outline-none'
        type='text' placeholder='search users...' value={search} onChange={(e) => setSearch(e.target.value)} />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      {isLoading ? (
        <ClipLoader className='absolute top-48 left-1/2' color='#0984e3' size={50} />
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-zinc-400">
          <table className="w-full text-left border-collapse rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th
                  onClick={() => setSortKey("name")}
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
                >
                  Name ⬆⬇
                </th>
                <th
                  onClick={() => setSortKey("email")}
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
                >
                  Email ⬆⬇
                </th>
                <th
                  onClick={() => setSortKey("username")}
                  className="px-6 py-3 text-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
                >
                  Username ⬆⬇
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`cursor-pointer transition hover:bg-blue-100 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    dispatch(toggleModal());
                  }}
                >
                  <td className="px-6 py-4 border-b">{user.name}</td>
                  <td className="px-6 py-4 border-b">{user.email}</td>
                  <td className="px-6 py-4 border-b">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button className="bg-blue-600 text-white px-8 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button className="bg-blue-600 text-white px-8 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)} disabled={!hasData}>
          Next
        </button>
      </div>
      {modalOpen && <Modal user={selectedUser} />}
    </div>
  )
}

export default UserPage