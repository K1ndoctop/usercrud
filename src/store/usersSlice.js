import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const API = 'http://localhost:8000/users';
const FAVORITES_API = 'http://localhost:8000/favorites';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const res = await axios.get(API);
        return res.data;
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUserObj, { dispatch }) => {
        await axios.post(API, newUserObj);
        dispatch(getUsers());
    }
);

export const getOneUser = createAsyncThunk(
    'users/getOneUser',
    async (userId) => {
        const { data } = await axios.get(`${API}/${userId}`);
        return data;
    }
);

export const saveChanges = createAsyncThunk(
    "users/saveChanges",
    async(updateUserObj, {dispatch}) =>{
        await axios.patch(`${API}/${updateUserObj.id}`,updateUserObj)
        dispatch(getUsers())
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async(userId,{dispatch}) =>{
        await axios.delete(`${API}/${userId}`)
        dispatch(getUsers())
    }
)

export const addToFavorites = createAsyncThunk(
    'users/addToFavorites',
    async (updateUserObj , {dispatch} ) =>{
        if(updateUserObj.favorites){
            const favoritesObj = {
                id: `favorite-${updateUserObj.id}`,
                user:updateUserObj
            }
            await axios.post(FAVORITES_API, favoritesObj)
        }else{
            await axios.delete(`${FAVORITES_API}/favorite-${updateUserObj.id}`)
        }
        await dispatch(saveChanges(updateUserObj))
        dispatch(getFavorites())

    }
)

export const getFavorites = createAsyncThunk(
    'users/getFavorites',
    async() =>{
        const {data} = await axios.get(FAVORITES_API)
        return data;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        oneUser: null,
        favorites:[]
    },
    reducers: {
        clearOneUserState: (state) => {
            state.oneUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(getOneUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(getOneUser.fulfilled, (state, action) => {
            state.oneUser = action.payload;
            state.loading = false;
        })
        .addCase(getFavorites.fulfilled, (state, action)    => {
            state.favorites =action.payload
        })
    }
});

export const { clearOneUserState } = usersSlice.actions;
export default usersSlice.reducer;