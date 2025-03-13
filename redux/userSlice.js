import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    modalOpen: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        toggleModal: (state) => {
            state.modalOpen = !state.modalOpen;
        }
    }
})

export const { setSelectedUser, toggleModal } = userSlice.actions;
export default userSlice.reducer;