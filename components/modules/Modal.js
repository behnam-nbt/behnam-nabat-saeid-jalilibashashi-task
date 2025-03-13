import { toggleModal } from '@/redux/userSlice';
import React from 'react'
import { useDispatch } from 'react-redux'

function Modal({ user }) {
    const dispatch = useDispatch();

    if (!user) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-85">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address.street}, {user.address.city}</p>
                <button className="btn btn-error mt-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => dispatch(toggleModal())}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default Modal