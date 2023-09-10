import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initState = {records : [], loading : false, error : null , postDetails: null,};

export const getPosts = createAsyncThunk("posts/getPosts", async ( _,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await fetch('http://localhost:5000/posts');
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

export const DeletePost = createAsyncThunk("posts/DeletePost", async (DeletedPostID,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        await fetch(`http://localhost:5000/posts/${DeletedPostID}`,{
            method: "DELETE",
        });
        return DeletedPostID;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

export const insertPost = createAsyncThunk("posts/insertPost", async (item,thunkAPI) => {
    const {rejectWithValue , getState} = thunkAPI;
    const {AuthSlice} = getState();
    item.userId = AuthSlice.id;
    try{
        const res = await fetch("http://localhost:5000/posts",{
            method: "POST",
            body: JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

export const getPostDetails = createAsyncThunk("posts/getPostDetails", async (postId,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await fetch(`http://localhost:5000/posts/${postId}`);
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

export const editPost = createAsyncThunk("posts/editPost", async (item,thunkAPI) => {
    const {rejectWithValue } = thunkAPI;
    try{
        const res = await fetch(`http://localhost:5000/posts/${item.id}`,{
            method: "PATCH",
            body: JSON.stringify(item),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const data = await res.json();
        return data;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
});

const postSlice = createSlice({
    name: "posts",
    initialState: initState,
    reducers: {
        cleanReducer : (state) => { state.postDetails = null;}
    },
    extraReducers:{
        
        // Get Data from API
        [getPosts.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [getPosts.fulfilled] : (state,action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [getPosts.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        //Delete Post
        [DeletePost.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [DeletePost.fulfilled] : (state,action) => {
            state.loading = false;
            state.records = state.records.filter((el) => action.payload !== el.id);
        
        },
        [DeletePost.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        //insert post 
        [insertPost.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertPost.fulfilled] : (state,action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertPost.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        //Get Post Details
        [getPostDetails.pending] : (state) => {
            state.loading = true;
            state.error = null;
            state.postDetails = null;
        },
        [getPostDetails.fulfilled] : (state,action) => {
            state.loading = false;
            state.postDetails = action.payload;
        },
        [getPostDetails.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        //Edit Post
        [editPost.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [editPost.fulfilled] : (state,action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [editPost.rejected] : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    },
});

export const {cleanReducer} = postSlice.actions;
export default postSlice.reducer;